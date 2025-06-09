
const AboutUs = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            About Minneapolis Limo
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <p className="text-lg text-slate-600 mb-6">
                For over 15 years, Minneapolis Limo has been the Twin Cities' premier 
                luxury transportation service. We specialize in reliable, professional 
                airport transfers and point-to-point transportation.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-slate-700">Fully licensed and insured</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-slate-700">Professional chauffeurs with background checks</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-slate-700">Price match guarantee</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-slate-700">Real-time flight tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-slate-700">24/7 customer support</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-lg text-white">
                <h3 className="text-2xl font-bold mb-4 text-amber-400">Our Promise</h3>
                <p className="text-slate-200">
                  "We guarantee on-time arrivals, professional service, and competitive pricing. 
                  Your comfort and satisfaction are our top priorities."
                </p>
                <div className="mt-6 pt-4 border-t border-slate-700">
                  <p className="text-sm text-slate-400">- Minneapolis Limo Management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
