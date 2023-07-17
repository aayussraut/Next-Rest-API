import {NextResponse} from "next/server";
import {useRouter} from "next/navigation";

export async function GET(request:Request,{params}:{params:{id:string}}){

    // const id=request.url.slice(request.url.lastIndexOf("/")+1); //alternative to params.id
    const id=params.id;

    const response= await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    const todo:Todo=await response.json();

    return NextResponse.json(todo);
}