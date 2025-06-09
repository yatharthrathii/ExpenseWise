import { useState } from "react";

const SignUpPage = () => {
    const [inputVal, setInputVal] = useState("");
    const [passwordVal, setPasswordVal] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleFormSignUp = (e) => {
        e.preventDefault();

        setErrorMessage("");

        if (!inputVal || !passwordVal || !confirmPassword) {
            setErrorMessage("Please fill in all the fields.");
            return;
        }

        if (passwordVal !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        console.log("User has successfully signed up");
        console.log({ UserName: inputVal, Password: passwordVal });

        setInputVal("");
        setPasswordVal("");
        setConfirmPassword("");
    };

    return (
        <div>
            <header className="flex gap-5 items-center p-3 cursor-pointer">
                <h1 className="text-blue-500 text-2xl font-bold">MyWebLink</h1>
                <h1 className="font-sans">Home</h1>
                <h1 className="font-sans">Products</h1>
                <h1 className="font-sans">About Us</h1>
            </header>

            <div className="text-center">
                <div className="w-72 text-center m-auto border rounded-2xl p-4 mt-16 border-blue-800">
                    <form
                        onSubmit={handleFormSignUp}
                        className="flex justify-center flex-col"
                    >
                        <h1 className="text-blue-400 text-2xl font-bold mt-4">SignUp</h1>

                        <input
                            className="border mt-5 rounded p-2"
                            placeholder="Email"
                            type="text"
                            value={inputVal}
                            onChange={(e) => setInputVal(e.target.value)}
                        />
                        <input
                            className="border mt-3 rounded p-2"
                            placeholder="Password"
                            type="password"
                            value={passwordVal}
                            onChange={(e) => setPasswordVal(e.target.value)}
                        />
                        <input
                            className="border mt-3 rounded p-2"
                            placeholder="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        {errorMessage && (
                            <p className="text-red-500 text-sm mt-3">{errorMessage}</p>
                        )}

                        <button
                            type="submit"
                            className="mt-5 border p-1 rounded-lg border-blue-900 bg-blue-500 text-white font-semibold cursor-pointer hover:bg-blue-600"
                        >
                            SignUp
                        </button>
                    </form>
                </div>

                <button className="border mt-4 px-6 py-1 rounded-lg cursor-pointer bg-blue-200 text-blue-950 hover:bg-blue-300">
                    Have an Account? Login
                </button>
            </div>
        </div>
    );
};

export default SignUpPage;
