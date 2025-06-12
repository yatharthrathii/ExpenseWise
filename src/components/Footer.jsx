import { Mail, Github, Linkedin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-indigo-600 text-white py-6">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-center md:text-left">
                    &copy; {new Date().getFullYear()} expenseWish. All rights reserved.
                </p>

                <div className="flex items-center gap-6">
                    <a
                        href="https://github.com/yatharthrathii"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-indigo-200 transition-colors flex items-center gap-1"
                    >
                        <Github size={18} />
                        GitHub
                    </a>

                    <a
                        href="https://www.linkedin.com/in/yatharthrathii"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-indigo-200 transition-colors flex items-center gap-1"
                    >
                        <Linkedin size={18} />
                        LinkedIn
                    </a>

                    <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=yatharthmaheshwari01@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-indigo-200 transition-colors flex items-center gap-1"
                    >
                        <Mail size={18} />
                        Email
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
