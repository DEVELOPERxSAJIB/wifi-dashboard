const createError = require("http-errors");
const { successResponse, errorResponse } = require("./responseController");
const {
  cloudUploadAvatar,
  cloudUploadDocumnets,
  cloudDeleteAvatar,
  cloudUserDocsDelete,
} = require("../utils/cloudinary");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const emailWithNodemailer = require("../utils/sendEmail");

/**
 * @DESC Get all users
 * @ROUTE /api/v1/user
 * @method GET
 * @access PRIVATE
 */
const getAllUsers = async (req, res, next) => {
  try {
    const { role } = req.query;
    let query = null;

    if (role === "admin") {
      query = null;
    } else if (role === "staff") {
      query = { role: "staff" };
    } else {
      return errorResponse(res, {
        statusCode: 400,
        message: "Invalid role specified",
      });
    }

    const user = await User.find(query)
      .sort({ createdAt: -1 })
      .select("-password")
      .populate("addedBy");

    if (user.length == 0) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Users not found",
      });
    }

    successResponse(res, {
      statusCode: 200,
      message: "All users found",
      payload: {
        totalUser: user.length,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Create new User
 * @ROUTE /api/v1/user/create-user
 * @method POST
 * @access PRIVATE
 */
const createUser = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const {
      name,
      email,
      mobile,
      password,
      role,
      salary,
      gender,
      remark,
      street,
      city,
      postalCode,
      country,
    } = req.body;

    // check user email
    const userEmailCheck = await User.findOne({ email });
    if (userEmailCheck) {
      throw createError(400, "User with this email already exists");
    }

    // check user mobile
    const userMobileCheck = await User.findOne({ mobile });
    if (userMobileCheck) {
      throw createError(400, "User with this mobile already exists");
    }

    // avatar upload
    let avatar = null;
    if (req.files) {
      const data = req.files?.userAvatar?.[0];
      if (data) {
        avatar = await cloudUploadAvatar(data);
      }
    }

    // documents upload
    let uploadedDocuements = null;
    if (req.files) {
      const doc = req.files?.userDocuments;
      if (doc) {
        uploadedDocuements = await cloudUploadDocumnets(doc);
      }
    }

    // separate data from uploaded docuements
    const documents = uploadedDocuements
      ? uploadedDocuements.map((file) => ({
          public_id: file.public_id,
          url: file.secure_url.replace("/upload/", "/upload/f_auto,q_auto/"),
        }))
      : [];

    // password hash
    const hashPass = await bcrypt.hash(password, 10);

    const data = {
      name,
      email,
      mobile,
      salary,
      role,
      gender,
      remark,
      addedBy: _id,
      password: hashPass,
      address: {
        street,
        city,
        postalCode,
        country,
      },
      avatar: {
        public_id: avatar ? avatar?.public_id : null,
        url: avatar ? avatar?.secure_url : null,
      },
      documents,
    };

    // create new user
    let user = await User.create(data);
    const addedByUser = await User.findById(user?._id).populate("addedBy");

    if (addedByUser?.addedBy?.role == "admin") {
      user = await User.findByIdAndUpdate(
        user?._id,
        {
          isActivate: true,
        },
        { new: true }
      );
    }

    // send email to new user
    const loginLink = "http://localhost:5173/login"
    const emailOptioins = {
      email: user.email,
      subject: "Congratulations! You are now become a member",
      html: `
      <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
      <head>
       <meta charset="UTF-8">
       <meta content="width=device-width, initial-scale=1" name="viewport">
       <meta name="x-apple-disable-message-reformatting">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta content="telephone=no" name="format-detection">
       <title>New Template 3</title><!--[if (mso 16)]>
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
     <![endif]-->
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
     @media only screen and (max-width:600px) {*[class="gmail-fix"] { display:none!important } p, a { line-height:150%!important } h1, h1 a { line-height:120%!important } h2, h2 a { line-height:120%!important } h3, h3 a { line-height:120%!important } h4, h4 a { line-height:120%!important } h5, h5 a { line-height:120%!important } h6, h6 a { line-height:120%!important } h1 { font-size:36px!important; text-align:left } h2 { font-size:26px!important; text-align:left } h3 { font-size:20px!important; text-align:left } h4 { font-size:24px!important; text-align:left } h5 { font-size:20px!important; text-align:left } h6 { font-size:16px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:36px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px!important } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px!important } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px!important } .es-menu td a { font-size:12px!important } .es-header-body p, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock a { font-size:12px!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right!important } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline!important } .es-m-txt-r .rollover span, .es-m-txt-c .rollover span, .es-m-txt-l .rollover span { line-height:0!important; font-size:0!important } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:20px!important; line-height:120%!important } a.es-button, button.es-button, .es-button-border { display:inline-block!important } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block!important } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .adapt-img { width:100%!important; height:auto!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } .es-social td { padding-bottom:10px } .h-auto { height:auto!important } }
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
            <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
              <tr>
               <td align="center" bgcolor="transparent" style="padding:0;Margin:0">
                <table class="es-content-body" cellpadding="0" cellspacing="0" bgcolor="transparent" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" role="none">
                  <tr>
                   <td align="left" style="padding:20px;Margin:0">
                    <table cellpadding="0" cellspacing="0" align="right" class="es-right" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                      <tr>
                       <td align="left" style="padding:0;Margin:0;width:560px">
                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                          <tr>
                           <td align="left" style="padding:0;Margin:0"><p align="center" style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">​</p></td>
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
                <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" bgcolor="#FFFFFF" role="none">
                  <tr>
                   <td align="left" bgcolor="#7367F0" style="padding:20px;Margin:0;background-color:#7367F0">
                    <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                      <tr>
                       <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                          <tr>
                           <td align="left" class="es-infoblock" style="padding:0;Margin:0"><h2 align="center" style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:26px;font-style:normal;font-weight:bold;line-height:31px;color:#fff">PENTA ONLINE</h2></td>
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
                           <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;font-size:0px"><img src="https://ebdqfmu.stripocdn.email/content/guids/CABINET_f3fc38cf551f5b08f70308b6252772b8/images/96671618383886503.png" alt="" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none" width="100"></td>
                          </tr>
                          <tr>
                           <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px"><h1 style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:46px;font-style:normal;font-weight:bold;line-height:55px;color:#333333">Congratulations!</h1></td>
                          </tr>
                          <tr>
                           <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:24px;letter-spacing:0;color:#333333;font-size:16px">​Dear ${user?.name},&nbsp;</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:24px;letter-spacing:0;color:#333333;font-size:16px">​</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:24px;letter-spacing:0;color:#333333;font-size:16px">Welcome to <strong>Penta Online</strong>. We are thrilled to have you join our &nbsp;community. Your account has been successfully created, and you are now &nbsp;officially a member.</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:24px;letter-spacing:0;color:#333333;font-size:16px">​</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:24px;letter-spacing:0;color:#333333;font-size:16px">Below are your account details:</p></td>
                          </tr>
                        </table></td>
                      </tr>
                    </table></td>
                  </tr>
                  <tr>
                   <td class="esdev-adapt-off" align="left" style="padding:20px;Margin:0">
                    <table cellpadding="0" cellspacing="0" class="esdev-mso-table" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px">
                      <tr>
                       <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                        <table cellpadding="0" cellspacing="0" class="es-left" align="left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                          <tr class="es-mobile-hidden">
                           <td align="left" style="padding:0;Margin:0;width:146px">
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr>
                               <td align="center" height="40" style="padding:0;Margin:0"></td>
                              </tr>
                            </table></td>
                          </tr>
                        </table></td>
                       <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                        <table cellpadding="0" cellspacing="0" class="es-left" align="left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                          <tr>
                           <td align="left" style="padding:0;Margin:0;width:121px">
                            <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#e8eafb" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#e8eafb;border-radius:10px 0 0 10px" role="presentation">
                              <tr>
                               <td align="right" style="padding:0;Margin:0;padding-top:10px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Login:</p></td>
                              </tr>
                              <tr>
                               <td align="right" style="padding:0;Margin:0;padding-bottom:10px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Password:</p></td>
                              </tr>
                            </table></td>
                          </tr>
                        </table></td>
                       <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                        <table cellpadding="0" cellspacing="0" class="es-left" align="left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                          <tr>
                           <td align="left" style="padding:0;Margin:0;width:155px">
                            <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#e8eafb" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#e8eafb;border-radius:0 10px 10px 0" role="presentation">
                              <tr>
                               <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:10px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px"><strong>${user.email}</strong></p></td>
                              </tr>
                              <tr>
                               <td align="left" style="padding:0;Margin:0;padding-bottom:10px;padding-left:10px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px"><strong>${password}</strong></p></td>
                              </tr>
                            </table></td>
                          </tr>
                        </table></td>
                       <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                        <table cellpadding="0" cellspacing="0" class="es-right" align="right" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                          <tr class="es-mobile-hidden">
                           <td align="left" style="padding:0;Margin:0;width:138px">
                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tr>
                               <td align="center" height="40" style="padding:0;Margin:0"></td>
                              </tr>
                            </table></td>
                          </tr>
                        </table></td>
                      </tr>
                    </table></td>
                  </tr>
                  <tr>
                   <td align="left" style="padding:0;Margin:0;padding-right:20px;padding-left:20px;padding-bottom:10px">
                    <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                      <tr>
                       <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:5px" role="presentation">
                          <tr>
                           <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><span class="es-button-border" style="border-style:solid;border-color:#2CB543;background:#7367F0;border-width:0px;display:inline-block;border-radius:6px;width:auto"><a href=${loginLink} class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;color:#FFFFFF;font-size:20px;padding:10px 30px 10px 30px;display:inline-block;background:#7367F0;border-radius:6px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid #7367F0;border-left-width:30px;border-right-width:30px">Login Now</a></span></td>
                          </tr>
                          <tr>
                           <td align="left" style="padding:0;Margin:0;padding-bottom:10px;padding-top:20px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">If you have any questions or need assistance, feel free to reach out to &nbsp;our support team</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">​</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Thanks,</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Penta Online Team!</p></td>
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
                <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" bgcolor="#FFFFFF" role="none">
                  <tr>
                   <td align="left" bgcolor="#7367F0" style="padding:15px;Margin:0;background-color:#7367F0">
                    <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                      <tr>
                       <td align="center" valign="top" style="padding:0;Margin:0;width:570px">
                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                          <tr>
                           <td align="left" class="es-infoblock" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;letter-spacing:0;color:#CCCCCC;font-size:12px">​</p></td>
                          </tr>
                        </table></td>
                      </tr>
                    </table></td>
                  </tr>
                </table></td>
              </tr>
            </table>
            <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
              <tr>
               <td align="center" bgcolor="transparent" style="padding:0;Margin:0">
                <table class="es-content-body" cellpadding="0" cellspacing="0" bgcolor="transparent" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" role="none">
                  <tr>
                   <td align="left" style="padding:20px;Margin:0">
                    <table cellpadding="0" cellspacing="0" align="right" class="es-right" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                      <tr>
                       <td align="left" style="padding:0;Margin:0;width:560px">
                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                          <tr>
                           <td align="left" style="padding:0;Margin:0"><p align="center" style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">​</p></td>
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

    await emailWithNodemailer(emailOptioins)

    successResponse(res, {
      statusCode: 200,
      message: `Profile successfull created for ${name}`,
      payload: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Delete User
 * @ROUTE /api/v1/user/:id
 * @method DELETE
 * @access PRIVATE
 */
const deleteUser = async (req, res, error) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      throw createError("Invalid User id provided");
    }

    // delete avatar
    if (user?.avatar?.public_id) {
      await cloudDeleteAvatar(user?.avatar?.public_id);
    }

    // delete documents
    const public_ids = [];
    user.documents.forEach((doc) => {
      public_ids.push(doc.public_id);
    });
    await cloudUserDocsDelete(public_ids);

    const deletedUser = await User.findByIdAndDelete(id);

    successResponse(res, {
      statusCode: 200,
      message: "User deleted successfully",
      payload: {
        user: deletedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Update User
 * @ROUTE /api/v1/user/:id
 * @method PUT/PATCH
 * @access private
 */
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      role,
      mobile,
      gender,
      salary,
      remark,
      street,
      city,
      postalCode,
      country,
      password,
      confirmPassword,
    } = req.body;

    // exist user check
    const existingUserWithEmail = await User.findOne({ email });
    if (existingUserWithEmail && existingUserWithEmail._id.toString() !== id) {
      throw new Error("Email already in use for another user");
    }

    // exist user check
    const existingUserWithMobile = await User.findOne({ mobile });
    if (
      existingUserWithMobile &&
      existingUserWithMobile._id.toString() !== id
    ) {
      throw new Error("Mobile number already in use");
    }

    if (password !== confirmPassword) {
      throw new Error("Confirm password does not match");
    }

    const updateUser = await User.findById(id);

    let avatar = null;
    if (req.files && req.files.userAvatar && req.files.userAvatar.length > 0) {
      const data = req.files.userAvatar[0];
      if (data) {
        // delete previous avatar
        await cloudDeleteAvatar(updateUser?.avatar?.public_id);

        // upload new avatar
        avatar = await cloudUploadAvatar(data);
      }
    }

    // documents upload
    let uploadedDocuments = null;
    if (
      req.files &&
      req.files.userDocuments &&
      req.files.userDocuments.length > 0
    ) {
      const doc = req.files.userDocuments;

      if (doc) {
        // delete documents
        const public_ids = updateUser.documents.map((doc) => doc.public_id);
        await cloudUserDocsDelete(public_ids);

        // upload new docs
        uploadedDocuments = await cloudUploadDocumnets(doc);
      }
    }

    // separate data from uploaded documents
    let documents = [];
    uploadedDocuments?.length > 0 &&
      uploadedDocuments?.map((file) => {
        documents.push({
          public_id: file.public_id,
          url: file.secure_url.replace("/upload/", "/upload/f_auto,q_auto/"),
        });
      });

    // make password hash
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : updateUser.password;

    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        role,
        mobile,
        gender,
        salary,
        remark,
        password: hashedPassword,
        address: {
          street,
          city,
          postalCode,
          country,
        },
        avatar: {
          public_id: avatar ? avatar.public_id : updateUser.avatar.public_id,
          url: avatar ? avatar.secure_url : updateUser.avatar.url,
        },
        documents: documents.length > 0 ? documents : updateUser?.documents,
      },
      { new: true }
    );

    successResponse(res, {
      statusCode: 200,
      message: `Profile successfully updated for ${user.name}`,
      payload: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Update User Ban Status
 * @ROUTE /api/v1/user/ban-user/:id
 * @method PUT
 * @access private
 */
const banUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const { isBan, name } = user;

    const userBanStatusUpdate = await User.findByIdAndUpdate(
      id,
      {
        isBan: !isBan,
      },
      { new: true }
    );

    const msg = userBanStatusUpdate?.isBan
      ? `${name} is banned successfully`
      : `${name} unban successfully`;

    successResponse(res, {
      statusCode: 200,
      message: msg,
      payload: {
        user: userBanStatusUpdate,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Update User isActivate Status
 * @ROUTE /api/v1/user/active-user/:id
 * @method PUT
 * @access private
 */
const activeUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const user = await User.findById(id);

    const { name } = user;

    const userActiveStatusUpdate = await User.findByIdAndUpdate(
      id,
      {
        isActivate: active,
      },
      { new: true }
    );

    const msg = `${name}'s account is activated`;

    successResponse(res, {
      statusCode: 200,
      message: msg,
      payload: {
        user: userActiveStatusUpdate,
      },
    });
  } catch (error) {
    next(error);
  }
};

// module export
module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  banUser,
  activeUser,
};
