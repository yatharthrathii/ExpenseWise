import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/themeSlice";

const ThemeToggle = () => {
    const dispatch = useDispatch();
    const isDark = useSelector((state) => state.theme.isDarkMode);

    return (
        <span
            onClick={() => dispatch(toggleTheme())}
            className="bg-white text-violet-700 font-semibold px-4 py-2 rounded-xl shadow hover:bg-indigo-100 transition"
        >
            {isDark ? "🌙 Dark" : "☀️ Light"}
        </span>
    );
};

export default ThemeToggle;
