import "./index.css";
import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import TodoApp from "./components/TodoApp";
import supabase from "../utils/createSupabaseClient";
import { useDispatch, useSelector } from "react-redux";
import { setSession } from "./features/authSlice";
import { AppState } from "./types";

export default function App() {
  const session = useSelector((state: AppState) => state.session.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setSession({ auth: session }));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession({ auth: session }));
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div className="max-w-96 m-auto">
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#4654cf",
                  brandAccent: "#3742a2",
                  brandButtonText: "white",
                  defaultButtonBackground: "#2e2e2e",
                  defaultButtonBackgroundHover: "#3e3e3e",
                },
              },
            },
          }}
          providers={[]}
        />
      </div>
    );
  } else {
    return <TodoApp />;
  }
}
