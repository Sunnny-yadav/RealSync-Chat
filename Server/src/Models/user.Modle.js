import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },

    email:{
        type:String,
        required: true
    },

    password:{
        type: String,
        required: true 
    },
    
    avatar:{
        type: String,
        default:"https://in.images.search.yahoo.com/search/images;_ylt=AwrKGKrFD8xnqAIA4Vm7HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3BpdnM-?p=avatar+logo&fr2=piv-web&type=E211IN714G0&fr=mcafee#id=110&iurl=https%3A%2F%2Fwww.creativefabrica.com%2Fwp-content%2Fuploads%2F2018%2F11%2FAvatar-logo-by-meisuseno-1.jpg&action=click"
    }
},{
    timestamps: true
});

export const User = mongoose.model("User", UserSchema)