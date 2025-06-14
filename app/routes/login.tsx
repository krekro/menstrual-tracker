import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useEffect, useState } from "react";
import { LogIn } from "lucide-react";
import { clearAllCookie, setLogin } from "~/services/cookies";
import { getKey } from "~/services/api";

function disableNav() {
  const ele = document.getElementById("navbar");
  if (ele) {
    ele.style.display = "none";
  }
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    const userCredentials = {
      user_name: username,
      password: password,
    };
    fetch(`${getKey("prod")}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    }).then((res) => {
      if (res.ok) {
        res.json().then((resBody) => {
          const session_id: string = resBody.session_id;
          const uid: string = resBody.uid;
          console.log(`Session: ${session_id}, uid: ${uid}`);
          setLogin(uid, "true", session_id);
          window.location.href = "/dashboard";
        });
      } else {
        alert("Error during login, please retry");
      }
    });
  }

  useEffect(() => {
    disableNav();
    clearAllCookie();
  }, []);

  return (
    <div className="flex justify-center py-50">
      <Card className="flex m-10 justify-center w-100 bg-gray-50 hover:bg-muted/50 transition-colors dark:bg-gray-800 dark:hover:bg-gray-700">
        <CardHeader>
          <CardTitle>
            <div className="inline-flex gap-3 justify-center">
              <span className=" font-extrabold">Your Period Calendar</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <Input
              type="text"
              placeholder="Username"
              className="mb-4 w-full bg-white"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              className="mb-4 w-full bg-white"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              className="w-full hover:scale-101 hover:bg-gray-700 hover:cursor-pointer"
              onClick={(event) => {
                event.preventDefault();
                if (!username || !password) {
                  alert("Please enter both username and password");
                  return;
                }
                handleLogin();
                console.log("Login button clicked");
              }}
            >
              <LogIn size={20} />
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
