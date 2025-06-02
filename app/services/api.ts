export function getKey(env: string){
    switch (env){
        case "dev":
            return "http://localhost:4000"
            break;
        case "prod":
            return "https://tenny-api.vercel.app"
            break;
    }
    
}