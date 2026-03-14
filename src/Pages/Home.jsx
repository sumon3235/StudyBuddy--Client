import FAQ from "../Components/FAQ";
import HowItWorks from "../Components/HowItWorks";
import Banner from "./Banner";
import Features from "./Features ";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <Features></Features>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;