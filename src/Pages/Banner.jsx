import { Link } from 'react-router';
import heroImage from '../../src/assets/heroImage.jpg'

const Banner = () => {
  return (
    <div className="hero min-h-[80vh] bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10">
        
        {/* Right image */}
        <img src={heroImage} className="max-w-sm rounded-lg shadow-2xl" />
        
        {/* Left text */}
        <div>
          <h1 className="nunito-font text-5xl font-bold leading-tight">
            Study Together, <br /> Achieve More
          </h1>
          <p className="py-6 text-base-content/70">
            Create assignments, collaborate with friends, 
            and grow together. Your study group, reimagined.
          </p>
          <div className="flex gap-3">
            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/all-assignments" className="btn btn-outline">
              Browse Assignments
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Banner
 
       