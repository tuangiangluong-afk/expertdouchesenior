import CookieBanner from "@/components/CookieBanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <GoogleAnalytics GA_MEASUREMENT_ID="G-SBRK53310F" />
            {children}
            <CookieBanner slug="home" cityName="Expert Douche Senior" />
        </>
    );
}
