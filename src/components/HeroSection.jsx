const HeroSection = () => {
    return (
        <section className="bg-white text-gray-800 py-16 px-4 md:px-8">
            <div className="max-w-5xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-6">
                    ExpenseWish
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8">
                    Your personal expense tracker with secure login, real-time Firebase sync, and premium unlocking features.
                </p>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10 text-left">
                    <FeatureCard
                        title="🔐 Private & Secure"
                        desc="Only you can access your expense data after login."
                    />
                    <FeatureCard
                        title="☁️ Firebase Realtime Sync"
                        desc="Add, edit and delete expenses anytime – synced instantly."
                    />
                    <FeatureCard
                        title="💎 Unlock Premium"
                        desc="Track ₹10,000+ and unlock dark theme + CSV download."
                    />
                    <FeatureCard
                        title="📈 Upcoming: AI Insights"
                        desc="Smart suggestions, category detection and expense tips powered by AI."
                    />
                    <FeatureCard
                        title="🌗 Theme Toggle"
                        desc="Switch between light and dark themes as per your comfort."
                    />
                    <FeatureCard
                        title="📊 Progress Graph (Coming Soon)"
                        desc="Visualize your monthly spend trend and categories in graph view."
                    />
                </div>

                <div className="mt-12">
                    <a
                        href="/dashboard"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-300 shadow-md"
                    >
                        Get Started
                    </a>
                </div>
            </div>
        </section>
    );
};

const FeatureCard = ({ title, desc }) => (
    <div className="bg-indigo-50 rounded-xl p-5 shadow hover:shadow-lg transition-all duration-200">
        <h3 className="text-indigo-800 font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-700 text-sm">{desc}</p>
    </div>
);

export default HeroSection;
