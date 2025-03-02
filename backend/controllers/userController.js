import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";


export const registerControllers = async (req, res, next) => {
    try {
        const { name, email, password, phone, dob, gender, termsAccepted } = req.body;

        // Check if all required fields are filled
        if (!name || !email || !password || !phone || !dob || !gender || termsAccepted === undefined) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields",
            });
        }

        // Validate phone number format (assuming 10-digit format)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Invalid phone number. Please enter a 10-digit number.",
            });
        }

        // Ensure the user has accepted terms and conditions
        if (!termsAccepted) {
            return res.status(400).json({
                success: false,
                message: "You must accept the Terms and Conditions to register.",
            });
        }

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        // Hash password before saving to the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        let newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            dob,
            gender,
            termsAccepted
        });

        // Exclude password from the response
        newUser.password = undefined;

        return res.status(201).json({
            success: true,
            message: "User registered successfully!",
            user: newUser,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + err.message,
        });
    }
};


// export const registerControllers = async (req, res, next) => {
//     try{
//         const {name, email, password} = req.body;

//         // console.log(name, email, password);

//         if(!name || !email || !password){
//             return res.status(400).json({
//                 success: false,
//                 message: "Please enter All Fields",
//             }) 
//         }

//         let user = await User.findOne({email});

//         if(user){
//             return res.status(409).json({
//                 success: false,
//                 message: "User already Exists",
//             });
//         }

//         //preparing encrypted for storing db
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // console.log(hashedPassword);
//         let newUser = await User.create({
//             name, 
//             email, 
//             password: hashedPassword, 
//         });

//         return res.status(200).json({
//             success: true,
//             message: "User Created Successfully",
//             user: newUser
//         });
//     }
//     catch(err){
//         return res.status(500).json({
//             success: false,
//             message: err.message,
//         });
//     }

// }
export const loginControllers = async (req, res, next) => {
    try{
        const { email, password } = req.body;

        // console.log(email, password);
  
        if (!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please enter All Fields",
            }); 
        }
    
        const user = await User.findOne({ email });
    
        if (!user){
            return res.status(401).json({
                success: false,
                message: "User not found",
            }); 
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch){
            return res.status(401).json({
                success: false,
                message: "Incorrect Email or Password",
            }); 
        }

        delete user.password;

        return res.status(200).json({
            success: true,
            message: `Welcome back, ${user.name}`,
            user,
        });

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

export const setAvatarController = async (req, res, next)=> {
    try{

        const userId = req.params.id;
       
        const imageData = req.body.image;
      
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage: imageData,
        },
        { new: true });

        return res.status(200).json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
          });


    }catch(err){
        next(err);
    }
}

export const allUsers = async (req, res, next) => {
    try{
        const user = await User.find({_id: {$ne: req.params.id}}).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ]);

        return res.json(user);
    }
    catch(err){
        next(err);
    }
}