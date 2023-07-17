import {NextResponse} from "next/server";
import {Request} from "next/dist/compiled/@edge-runtime/primitives";

const API_KEY: string=process.env.DATA_API_KEY as string;

const DATA_SOURCE_URL="https://jsonplaceholder.typicode.com/todos";

export async function GET(){

    const response= await fetch(DATA_SOURCE_URL);

    const todos:Todo[]= await response.json();

    return NextResponse.json(todos);
}

export async function POST(request:Request){
    const {userId,title}:Partial<Todo> = await request.json();

    if(!userId || !title){
        return NextResponse.json({"message": "userId and title are required"});
    }

    const response=await fetch(`${DATA_SOURCE_URL}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "API_KEY": API_KEY // just a fake API_KEY, only to simulate how to store data in .env file and use it in the code
        },
        body:JSON.stringify({
            userId,
            title,
            completed:false
        })
    });

    const todo:Todo=await response.json();
    return NextResponse.json(todo);
}

export async function PUT(request:Request){
    const {userId,title,completed,id}:Todo = await request.json();

    if(!userId || !title || typeof(completed) !=="boolean" || !id){
        return NextResponse.json({"message": "userId and title are required"});
    }

    const response=await fetch(`${DATA_SOURCE_URL}/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "API_KEY": API_KEY // just a fake API_KEY, only to simulate how to store data in .env file and use it in the code
        },
        body:JSON.stringify({
            userId,
            title,
            completed
        })
    });

    const updatedTodo:Todo=await response.json();
    return NextResponse.json(updatedTodo);
}

export async function DELETE(request:Request){
    const {id}:Partial<Todo> = await request.json();

    if(!id){
        return NextResponse.json({"message": "id is required"});
    }

    await fetch(`${DATA_SOURCE_URL}/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            "API_KEY": API_KEY // just a fake API_KEY, only to simulate how to store data in .env file and use it in the code
        }
    });

    return  NextResponse.json({"message": `Todo with id ${id} has been deleted`});
}

