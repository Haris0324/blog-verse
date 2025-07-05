import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

const LoadDB = async() => {
    ConnectDB();
}

LoadDB();

// adding new email id in the db
export async function POST(request) {
    const formData = await request.formData();
    const emailData = {
        email: `${formData.get('email')}`, 
    }

    // using email model to store in db
    await EmailModel.create(emailData);
    return NextResponse.json({success:true,msg:"Email subscribed"});

}

// api route for getting all emails
export async function GET(request) {
    const emails = await EmailModel.find({});
    return NextResponse.json({emails});
}

// api route for delete mails
export async function DELETE(request) {
    const id = await request.nextUrl.searchParams.get('id');
    await EmailModel.findByIdAndDelete(id);
    return NextResponse.json({success:true,msg:"Email deleted"})
}
