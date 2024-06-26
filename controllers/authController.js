const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { successResponse } = require("./responseController");
const {
  replaceDotWithHeypen,
  replaceHeypenWithDot,
} = require("../helpers/bothAccessAbleToken");
const emailWithNodemailer = require("../utils/sendEmail");
const { cloudDeleteAvatar, cloudUploadAvatar } = require("../utils/cloudinary");

/**
 * @DESC User Login
 * @ROUTE /api/v1/auth/login
 * @method POST
 * @access public
 */
const authLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // find login user by email
    const loginUser = await User.findOne({ email });

    // user not found
    if (!loginUser) {
      throw createError(404, "Invalid email or password");
    }

    // password check
    const passwordCheck = await bcrypt.compare(password, loginUser.password);

    // password check
    if (!passwordCheck) {
      throw createError(404, "Invalid email or password");
    }

    const user = await User.findOne({ email }).select("-password");

    if (!user.isActivate) {
      if (res.cookie) {
        res.clearCookie("accessToken");
      }
      throw createError(404, "Your account is not activated yet");
    }

    if (user.isBan) {
      if (res.cookie) {
        res.clearCookie("accessToken");
      }
      throw createError(
        404,
        "Unfortunately your account is Banned. Please talk to our suppor system"
      );
    }

    // create access token
    const aToken = jwt.sign(
      { email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN,
      }
    );

    res.cookie("accessToken", aToken, {
      httpOnly: true,
      secure: process.env.MODE == "Development" ? false : true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    successResponse(res, {
      statusCode: 200,
      message: "User Login Successful",
      payload: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC User Logout
 * @ROUTE /api/v1/auth/logout
 * @method POST
 * @access public
 */
const authLogout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");

    successResponse(res, {
      statusCode: 200,
      message: "User Logout Successful",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC LoggedIn User Data
 * @ROUTE /api/v1/auth/user
 * @method GET
 * @access public
 */
const loggedInUser = async (req, res, next) => {
  try {
    return successResponse(res, {
      statusCode: 200,
      message: "Logged in user details",
      payload: { user: req.user },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Update User Data
 * @ROUTE /api/v1/auth/update-user
 * @method PUT
 * @access private
 */
const updateAuthUser = async (req, res, next) => {
  try {
    const {
      name,
      email,
      mobile,
      salary,
      gender,
      street,
      city,
      postalCode,
      country,
    } = req.body;

    const existingUser = await User.findById(req.user._id);
    if (!existingUser) {
      throw createError(400, "User not found");
    }

    let avatar = null;
    if (req.file) {
      const public_id = existingUser.avatar?.public_id;
      if (public_id) {
        await cloudDeleteAvatar(public_id);
      }
      avatar = await cloudUploadAvatar(req.file);
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        email,
        mobile,
        salary,
        gender,
        avatar: {
          public_id: avatar?.public_id
            ? avatar?.public_id
            : existingUser?.avatar?.public_id,
          url: avatar?.secure_url
            ? avatar?.secure_url
            : existingUser?.avatar.url,
        },
        address: {
          street,
          city,
          postalCode,
          country,
        },
      },
      { new: true }
    ).select("-password");

    successResponse(res, {
      statusCode: 200,
      message: "Your profile updated successfully",
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Update Password
 * @ROUTE api/v1/auth/update-password
 * @method PATCH
 * @access PRIVATE
 */
const updatePassword = async (req, res, next) => {
  try {
    const id = req.user._id;
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      throw createError(400, "All feilds are required");
    }

    const user = await User.findById(id);

    // check previous user password
    const isPasswordMatch = bcrypt.compareSync(oldPassword, user.password);

    if (!isPasswordMatch) {
      throw createError(400, "Old password mismatch");
    }

    if (newPassword !== confirmNewPassword) {
      throw createError(400, "Confirm password not matched");
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    const updatedPassUser = await User.findByIdAndUpdate(
      id,
      {
        password: hashPassword,
      },
      { new: true }
    ).select("-password");

    res.clearCookie("accessToken", null, {
      httpOnly: true,
    });

    successResponse(res, {
      success: true,
      message: "Password updated successfully. Please login again",
      payload: {
        user: updatedPassUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Forget Password
 * @ROUTE api/v1/auth/forget-password
 * @method POST
 * @access PUBLIC
 */
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw createError(400, "Email is required");
    }

    const user = await User.findOne({ email });

    // if existing user not found
    if (!user) {
      throw createError(404, "No such user registred with this email yet");
    }

    const token = jwt.sign({ email }, process.env.JWT_RESET_PASSWORD_KEY, {
      expiresIn: "15m",
    });

    // make token accessable
    const acceptableTokenForClient = replaceDotWithHeypen(token);

    // gen link
    const link = `${process.env.CLIENT_URL}/request-reset-password/${acceptableTokenForClient}`;

    // prepare for sent email
    const emailOptions = {
      email: user.email,
      subject: "Reset your password",
      html: `
      <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
      <head>
       <meta charset="UTF-8">
       <meta content="width=device-width, initial-scale=1" name="viewport">
       <meta name="x-apple-disable-message-reformatting">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta content="telephone=no" name="format-detection">
       <title>New Template 2</title><!--[if (mso 16)]>
         <style type="text/css">
         a {text-decoration: none;}
         </style>
         <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
     <xml>
         <o:OfficeDocumentSettings>
         <o:AllowPNG></o:AllowPNG>
         <o:PixelsPerInch>96</o:PixelsPerInch>
         </o:OfficeDocumentSettings>
     </xml>
     <![endif]--><!--[if mso]>
      <style type="text/css">
          ul {
       margin: 0 !important;
       }
       ol {
       margin: 0 !important;
       }
       li {
       margin-left: 47px !important;
       }
      </style><![endif]
     -->
       <style type="text/css">
     .rollover:hover .rollover-first {
       max-height:0px!important;
       display:none!important;
       }
       .rollover:hover .rollover-second {
       max-height:none!important;
       display:block!important;
       }
       .rollover span {
       font-size:0px;
       }
       u + .body img ~ div div {
       display:none;
       }
       #outlook a {
       padding:0;
       }
       span.MsoHyperlink,
     span.MsoHyperlinkFollowed {
       color:inherit;
       mso-style-priority:99;
       }
       a.es-button {
       mso-style-priority:100!important;
       text-decoration:none!important;
       }
       a[x-apple-data-detectors] {
       color:inherit!important;
       text-decoration:none!important;
       font-size:inherit!important;
       font-family:inherit!important;
       font-weight:inherit!important;
       line-height:inherit!important;
       }
       .es-desk-hidden {
       display:none;
       float:left;
       overflow:hidden;
       width:0;
       max-height:0;
       line-height:0;
       mso-hide:all;
       }
       .es-button-border:hover > a.es-button {
       color:#ffffff!important;
       }
     @media only screen and (max-width:600px) {.es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } *[class="gmail-fix"] { display:none!important } p, a { line-height:150%!important } h1, h1 a { line-height:120%!important } h2, h2 a { line-height:120%!important } h3, h3 a { line-height:120%!important } h4, h4 a { line-height:120%!important } h5, h5 a { line-height:120%!important } h6, h6 a { line-height:120%!important } h1 { font-size:36px!important; text-align:left } h2 { font-size:26px!important; text-align:left } h3 { font-size:20px!important; text-align:left } h4 { font-size:24px!important; text-align:left } h5 { font-size:20px!important; text-align:left } h6 { font-size:16px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:36px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px!important } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px!important } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px!important } .es-menu td a { font-size:12px!important } .es-header-body p, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock a { font-size:12px!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right!important } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline!important } .es-m-txt-r .rollover span, .es-m-txt-c .rollover span, .es-m-txt-l .rollover span { line-height:0!important; font-size:0!important } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:20px!important; line-height:120%!important } a.es-button, button.es-button, .es-button-border { display:inline-block!important } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block!important } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .adapt-img { width:100%!important; height:auto!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } .es-social td { padding-bottom:10px } .h-auto { height:auto!important } }
     @media screen and (max-width:384px) {.mail-message-content { width:414px!important } }
     </style>
      </head>
      <body class="body" style="width:100%;height:100%;padding:0;Margin:0">
       <div dir="ltr" class="es-wrapper-color" lang="en" style="background-color:#FAFAFA"><!--[if gte mso 9]>
           <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
             <v:fill type="tile" color="#fafafa"></v:fill>
           </v:background>
         <![endif]-->
        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA">
          <tr>
           <td valign="top" style="padding:0;Margin:0">
            <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
              <tr>
               <td class="es-info-area" align="center" style="padding:0;Margin:0">
                <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" bgcolor="#FFFFFF" role="none">
                  <tr>
                   <td align="left" style="padding:20px;Margin:0">
                    <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                      <tr>
                       <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                          <tr>
                           <td align="center" class="es-infoblock" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;letter-spacing:0;color:#CCCCCC;font-size:12px"><a target="_blank" href="" style="mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">​</a></p></td>
                          </tr>
                        </table></td>
                      </tr>
                    </table></td>
                  </tr>
                </table></td>
              </tr>
            </table>
            <table cellpadding="0" cellspacing="0" class="es-header" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
              <tr>
               <td align="center" style="padding:0;Margin:0">
                <table bgcolor="#ffffff" class="es-header-body" align="center" cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
                  <tr>
                   <td align="left" bgcolor="#7367F0" style="padding:20px;Margin:0;background-color:#7367F0">
                    <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                      <tr>
                       <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:560px">
                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                          <tr>
                           <td align="left" style="padding:0;Margin:0"><h2 align="center" style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:26px;font-style:normal;font-weight:bold;line-height:31px;color:#fff">PENTA ONLINE</h2></td>
                          </tr>
                        </table></td>
                      </tr>
                    </table></td>
                  </tr>
                </table></td>
              </tr>
            </table>
            <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
              <tr>
               <td align="center" style="padding:0;Margin:0">
                <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                  <tr>
                   <td align="left" style="padding:0;Margin:0;padding-top:15px;padding-right:20px;padding-left:20px">
                    <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                      <tr>
                       <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                          <tr>
                           <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;font-size:0px"><img src="https://ebdqfmu.stripocdn.email/content/guids/CABINET_91d375bbb7ce4a7f7b848a611a0368a7/images/69901618385469411.png" alt="" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none" width="100"></td>
                          </tr>
                          <tr>
                           <td align="center" class="es-m-p0r es-m-p0l es-m-txt-c" style="Margin:0;padding-top:15px;padding-right:40px;padding-bottom:15px;padding-left:40px"><h1 style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:46px;font-style:normal;font-weight:bold;line-height:55px;color:#333333">Password reset&nbsp;</h1></td>
                          </tr>
                          <tr>
                           <td align="left" style="padding:0;Margin:0;padding-top:10px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">After you click the button, you'll be asked to complete the following steps:</p>
                            <ol style="font-family:arial, 'helvetica neue', helvetica, sans-serif;padding:0px 0px 0px 40px;margin:15px 0px">
                             <li style="color:#333333;margin:0px 0px 15px;font-size:14px">Enter a new password.</li>
                             <li style="color:#333333;margin:0px 0px 15px;font-size:14px">Confirm your new password.</li>
                             <li style="color:#333333;margin:0px 0px 15px;font-size:14px">Click Submit.</li>
                            </ol></td>
                          </tr>
                        </table></td>
                      </tr>
                    </table></td>
                  </tr>
                  <tr>
                   <td align="left" style="padding:0;Margin:0;padding-right:20px;padding-left:20px;padding-bottom:20px">
                    <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                      <tr>
                       <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:5px" role="presentation">
                          <tr>
                           <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><span class="es-button-border" style="border-style:solid;border-color:#2CB543;background:#7367F0;border-width:0px;display:inline-block;border-radius:6px;width:auto"><a href=${link} class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;color:#FFFFFF;font-size:20px;padding:10px 30px 10px 30px;display:inline-block;background:#7367F0;border-radius:6px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid #7367F0;border-left-width:30px;border-right-width:30px">RESET YOUR PASSWORD</a></span></td>
                          </tr>
                          <tr>
                           <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;padding-top:10px"><h3 style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:20px;font-style:normal;font-weight:bold;line-height:30px;color:#333333">This link is valid for one use only. Expires in 1 hours.</h3></td>
                          </tr>
                          <tr>
                           <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">If you didn't request to reset your&nbsp;password, please disregard this message or contact our customer service department.</p></td>
                          </tr>
                        </table></td>
                      </tr>
                    </table></td>
                  </tr>
                  <tr>
                   <td align="left" bgcolor="#7367F0" style="padding:0;Margin:0;padding-right:20px;padding-left:20px;padding-top:20px;background-color:#7367F0">
                    <table cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                      <tr>
                       <td align="left" style="padding:0;Margin:0;width:560px">
                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                          <tr>
                           <td align="left" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">​</p></td>
                          </tr>
                        </table></td>
                      </tr>
                    </table></td>
                  </tr>
                </table></td>
              </tr>
            </table>
            <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
              <tr>
               <td class="es-info-area" align="center" style="padding:0;Margin:0">
                <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px;border-width:0" bgcolor="#FFFFFF" role="none">
                  <tr>
                   <td align="left" style="padding:20px;Margin:0">
                    <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                      <tr>
                       <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                          <tr>
                           <td align="center" class="es-infoblock" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;letter-spacing:0;color:#CCCCCC;font-size:12px"><a target="_blank" href="" style="mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">​</a></p></td>
                          </tr>
                        </table></td>
                      </tr>
                    </table></td>
                  </tr>
                </table></td>
              </tr>
            </table></td>
          </tr>
        </table>
       </div>
      </body>
     </html>
      `,
    };

    // send email with nodemailer
    await emailWithNodemailer(emailOptions);

    successResponse(res, {
      statusCode: 200,
      message: `Check your inbox and follow the instructions to reset your password.`,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Reset the password
 * @ROUTE api/v1/auth/reset-password/:token
 * @method PATCH
 * @access PRIVATE
 */
const resetPassword = async (req, res, next) => {
  try {
    const { token, password, confirmPassword } = req.body;

    if (!token || !password || !confirmPassword) {
      throw createError(400, "All feilds are required");
    }

    const serverAcceptableToken = replaceHeypenWithDot(token);

    const decoded = jwt.verify(
      serverAcceptableToken,
      process.env.JWT_RESET_PASSWORD_KEY
    );

    const user = await User.findOne({
      email: decoded.email,
    });

    if (!user) {
      throw createError(404, "User not found for reset Password");
    }

    if (password !== confirmPassword) {
      throw createError(400, "Confirm password not matched");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const userAfterResetPass = await User.findByIdAndUpdate(
      user._id,
      {
        password: hashPassword,
      },
      { new: true }
    ).select("-password");

    successResponse(res, {
      statusCode: 200,
      message: "Password reset successfully. Please login here!!!",
      payload: {
        user: userAfterResetPass,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authLogin,
  authLogout,
  loggedInUser,
  updatePassword,
  forgotPassword,
  resetPassword,
  updateAuthUser,
};
