import { UserRoles } from '../enums';

// Todo: revisar tipos de TS
export const isAdmin = (req: any, res: any, next: any) => {
  try {
    if (!req.user) {
      return res.status(500).json({
        message: 'Role is being tried to be verified prior token validation',
      });
    }
    const { rol, uid } = req.user;

    if (rol !== UserRoles.ADMIN) {
      return res.status(401).json({
        message: `Unable to perform. User's role with uid: ${uid} is not ${UserRoles.ADMIN}`,
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Token is not valid!' });
  }
};
