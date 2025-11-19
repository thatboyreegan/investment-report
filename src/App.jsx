import React, { useState, useRef, useMemo } from 'react';
import { Landmark, MapPin, Scale, Home, AlertTriangle, Building, Zap, Droplet, Wallet, Calendar, CheckCircle, ArrowLeft, TrendingUp, ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react';

const PRIMARY_NAVY = '#0C1835';


const GROWTH_AREAS_DATA = [
  {
    region: 'Kitengela/Syokimau/Athi River',
    infrastructure: 'Nairobi Expressway, SGR, Bypass Roads',
    outlook: 'High, 20–40% appreciation recently',
    detail: 'Primed for development due to ongoing road and bypass expansions, Nairobi Expressway effects, and planned mass rapid transport systems.',
    metrics: [{ title: 'Appreciation', value: '20-40%' }, { title: 'Risk', value: 'Medium' }],
  },
  {
    region: 'Konza Technopolis Belt',
    infrastructure: 'Roads, Tech City, Utilities',
    outlook: 'Very High, early stage',
    detail: 'The area surrounding Konza City will benefit from ongoing land servicing, road upgrades, and the growth of Kenya’s “Silicon Savannah”.',
    metrics: [{ title: 'Appreciation', value: '50%+' }, { title: 'Risk', value: 'High (Long-Term)' }],
  },
  {
    region: 'Thika/Ruiru/Juja',
    infrastructure: 'Thika Superhighway, Bypasses',
    outlook: 'Sustained, stable',
    detail: 'Following the Thika Superhighway’s impact, these towns are anticipated to grow, especially with new link roads and bypasses.',
    metrics: [{ title: 'Appreciation', value: '10-15%' }, { title: 'Risk', value: 'Low' }],
  },
  {
    region: 'Coastal towns (Diani, Kilifi, Malindi)',
    infrastructure: 'SGR, Highways, Ports',
    outlook: 'High, luxury/resort demands',
    detail: 'Will experience increased property values thanks to the expansion of ports, improved highways, and continued SGR/LAPSSET corridor development.',
    metrics: [{ title: 'Appreciation', value: '25-35%' }, { title: 'Risk', value: 'Medium' }],
  },
];

const INVESTMENT_DATA = [
  {
    id: 'l1',
    type: 'land',
    title: 'Thigio Gardens Phase I',
    location: 'Thigio',
    subLocation: 'Kiambu',
    size: '1/8 Acre Residential Plot',
    price: 'KES 350,000',
    keyNote: 'High-entry value, Ready Titles.',
    link: 'https://dennkarmproperties.com/properties/barizi-gardens-phase-i-1-8th-acre-residential-plots/',
    amenities: [{ icon: CheckCircle, text: 'Ready Title Deeds' }, { icon: Calendar, text: 'Installment Plans' }, { icon: MapPin, text: 'Developed Access Roads' }],
    dueDiligence: 'Clean social media sentiment, no active court cases found.',
    breakdown: [{ title: 'Investment Rationale', content: 'Located 40km from Nairobi CBD, this area is rapidly developing, promising high capital appreciation over the next 3-5 years. Ideal for land banking or future residential development.' }],
  },
  {
    id: 'l2_mtwapa',
    type: 'land',
    title: 'Mtwapa Sunset Creek Plots',
    location: 'Mtwapa',
    subLocation: 'Mombasa',
    size: '400 m² Residential Plot',
    price: 'KES 1,900,000',
    keyNote: 'Access to Sunset Creek; excellent mid-range investment.',
    link: 'https://www.property24.co.ke/vacant-land-plot-for-sale-in-mtwapa-116613092',
    amenities: [{ icon: Building, text: 'Gated Options' }, { icon: Droplet, text: 'Creek Views' }, { icon: Scale, text: 'Freehold Title' }],
    dueDiligence: 'High demand for affordable coastal housing in Mtwapa corridor.',
    breakdown: [{ title: 'Coastal Rationale', content: 'These plots are strategically located to benefit from the northward expansion of Mombasa. Close proximity to essential amenities and the creek provides scenic appeal.' }],
  },
  {
    id: 'l3_diani_1',
    type: 'land',
    title: 'Diani Prime Beach Plots (Phase I)',
    location: 'Diani',
    subLocation: 'Kwale',
    size: '0.25 Acre Resort Plot',
    price: 'KES 4,500,000+',
    keyNote: '1.2km from main beach access point; premium segment.',
    link: 'https://www.property24.co.ke/vacant-land-plot-for-sale-in-diani-116554648',
    amenities: [{ icon: Building, text: 'Gated Options' }, { icon: Landmark, text: 'Near Diani Airport' }, { icon: Scale, text: 'Freehold Title' }],
    dueDiligence: 'Strong tourism-driven market ensures high land value retention and appreciation.',
    breakdown: [{ title: 'Coastal Rationale', content: 'Diani is a recognized high-value luxury destination. These plots are ideal for building holiday homes or boutique short-term rental facilities.' }],
  },
  {
    id: 'l4_diani_2',
    type: 'land',
    title: 'Diani Exclusive Golf View Lots',
    location: 'Diani',
    subLocation: 'Kwale',
    size: '1/2 Acre Golf-Adjacent Plot',
    price: 'KES 6,200,000',
    keyNote: 'Adjacent to Diani Golf Course, high-end residential potential.',
    link: 'https://www.property24.co.ke/vacant-land-plot-for-sale-in-diani-116405654',
    amenities: [{ icon: Building, text: 'Adjacent to Golf Course' }, { icon: Droplet, text: 'Borehole Water' }, { icon: Scale, text: '99-year Leasehold' }],
    dueDiligence: 'Focus on residential golf community development. Leasehold status should be noted.',
    breakdown: [{ title: 'Premium Rationale', content: 'Golf course proximity significantly boosts capital values. Target high-net-worth individuals for future resale or luxury villa development.' }],
  },
  {
    id: 'a1_mtwapa_2br_1', type: 'apartment', location: 'Mtwapa', subLocation: 'Mombasa', size: '2 Bedroom Unit', price: 'KES 3,500,000',
    keyNote: 'Budget-friendly with great access to amenities.', link: 'https://www.property24.co.ke/2-bedroom-apartment-flat-for-sale-in-mtwapa-116536430',
    amenities: [{ icon: Home, text: 'En-suite Bedrooms' }, { icon: Building, text: 'Swimming Pool' }, { icon: CheckCircle, text: '24/7 Security' }],
    dueDiligence: 'High occupancy rates observed (75%+) in similar projects.', breakdown: [{ title: 'Rental Projections', content: 'Estimated monthly yield KES 40k-50k. Strong long-term rental market.' }],
  },
  {
    id: 'a1_mtwapa_3br_1', type: 'apartment', location: 'Mtwapa', subLocation: 'Mombasa', size: '3 Bedroom Unit', price: 'KES 6,500,000',
    keyNote: 'Spacious family unit, good mid-range rental income.', link: 'https://www.property24.co.ke/3-bedroom-apartment-flat-for-sale-in-mtwapa-116536049',
    amenities: [{ icon: Building, text: 'Gym & Spa Access' }, { icon: Zap, text: 'Full Backup Power' }, { icon: Home, text: 'Balcony' }],
    dueDiligence: 'Modern finishing, popular with expatriates and middle-class families.', breakdown: [{ title: 'Rental Projections', content: 'Estimated monthly yield KES 65k-75k. Excellent for capital gains.' }],
  },
  {
    id: 'a1_mtwapa_3br_2', type: 'apartment', location: 'Mtwapa', subLocation: 'Mombasa', size: '3 Bedroom Unit (Ocean View)', price: 'KES 7,500,000',
    keyNote: 'Premium Mtwapa listing with ocean views.', link: 'https://www.property24.co.ke/3-bedroom-apartment-flat-for-sale-in-mtwapa-116535981',
    amenities: [{ icon: Landmark, text: 'Ocean Views' }, { icon: Droplet, text: 'Borehole Water' }, { icon: Scale, text: 'Close to Malls' }],
    dueDiligence: 'View quality drives premium pricing. Verify unobstructed views.', breakdown: [{ title: 'Premium Feature', content: 'Ocean view units command higher short-term rental rates during peak seasons.' }],
  },
  {
    id: 'a1_mtwapa_2br_2', type: 'apartment', location: 'Mtwapa', subLocation: 'Mombasa', size: '2 Bedroom Unit', price: 'KES 4,200,000',
    keyNote: 'New development in Phase II, flexible payment plans.', link: 'https://www.property24.co.ke/2-bedroom-apartment-flat-for-sale-in-mtwapa-115475118',
    amenities: [{ icon: Wallet, text: 'Installment Plans' }, { icon: Calendar, text: 'Q1 2026 Handover' }, { icon: CheckCircle, text: 'Tiled Floors' }],
    dueDiligence: 'Off-plan investment; track developer progress closely.', breakdown: [{ title: 'Off-Plan Potential', content: 'Buying off-plan guarantees higher capital appreciation upon completion.' }],
  },
 
  {
    id: 'a2_diani_2br_1', type: 'apartment', location: 'Diani', subLocation: 'Kwale', size: '2 Bedroom Unit', price: 'KES 8,500,000',
    keyNote: 'Ideal for short-term holiday rentals (Airbnb).', link: 'https://www.property24.co.ke/2-bedroom-apartment-flat-for-sale-in-diani-116534041',
    amenities: [{ icon: Landmark, text: 'Direct Beach Access' }, { icon: Building, text: 'Infinity Pool' }, { icon: Zap, text: 'Full Backup Power' }],
    dueDiligence: 'High ROI from short-term holiday lets. Focus on quality property management.', breakdown: [{ title: 'Tourism Yield', content: 'Diani is a top global tourism spot. High daily rates offset acquisition costs.' }],
  },
  {
    id: 'a2_diani_2br_2', type: 'apartment', location: 'Diani', subLocation: 'Kwale', size: '2 Bedroom Penthouse', price: 'KES 15,000,000',
    keyNote: 'Luxury penthouse unit, highest potential income bracket.', link: 'https://www.property24.co.ke/2-bedroom-apartment-flat-for-sale-in-diani-116400065',
    amenities: [{ icon: Landmark, text: 'Rooftop Terrace' }, { icon: Building, text: 'Fully Furnished Option' }, { icon: Home, text: 'Private Lift Access' }],
    dueDiligence: 'Premium pricing requires proven track record of rental yield.', breakdown: [{ title: 'Exclusivity', content: 'Penthouse exclusivity attracts high-net-worth renters for premium holidays.' }],
  },

  {
    id: 'a3_nyali_2br', type: 'apartment', location: 'Nyali', subLocation: 'Mombasa', size: '2 Bedroom Unit', price: 'KES 11,500,000',
    keyNote: 'Close proximity to City Mall and Nyali Reef.', link: 'https://www.property24.co.ke/2-bedroom-apartment-flat-for-sale-in-nyali-116537005',
    amenities: [{ icon: CheckCircle, text: 'Proximity to Malls' }, { icon: Building, text: 'Gated Community' }, { icon: Scale, text: 'Freehold Title' }],
    dueDiligence: 'Nyali is an established, high-demand residential hub.', breakdown: [{ title: 'Location Value', content: 'Excellent connectivity and essential service proximity ensure stable occupancy.' }],
  },
  {
    id: 'a3_nyali_3br', type: 'apartment', location: 'Nyali', subLocation: 'Mombasa', size: '3 Bedroom Unit', price: 'KES 16,500,000',
    keyNote: 'Modern design with dedicated parking and security.', link: 'https://www.property24.co.ke/3-bedroom-apartment-flat-for-sale-in-nyali-116591915',
    amenities: [{ icon: Home, text: 'All En-suite' }, { icon: Zap, text: 'Solar Water Heating' }, { icon: Building, text: 'Dedicated Parking' }],
    dueDiligence: 'Target market is growing middle/upper-middle class families.', breakdown: [{ title: 'Key Features', content: 'Smart home integrations and high-end finishes justify the price point.' }],
  },
  {
    id: 'a3_nyali_1br', type: 'apartment', location: 'Nyali', subLocation: 'Mombasa', size: '1 Bedroom Unit', price: 'KES 7,800,000',
    keyNote: 'Compact, high-yield investment targeting young professionals.', link: 'https://www.property24.co.ke/1-bedroom-apartment-flat-for-sale-in-nyali-116529400',
    amenities: [{ icon: Wallet, text: 'Low Service Charge' }, { icon: CheckCircle, text: 'Modern Kitchenette' }, { icon: Landmark, text: 'Walkable Distance' }],
    dueDiligence: 'Small units have high demand for single/double occupancy.', breakdown: [{ title: 'Rental Efficiency', content: 'Smaller size allows for lower entry price and potentially higher yield percentage.' }],
  },
  

  {
    id: 'a4_kizingo_3br_1', type: 'apartment', location: 'Kizingo', subLocation: 'Mombasa', size: '3 Bedroom Unit', price: 'KES 14,000,000',
    keyNote: 'Old Town proximity, historical prestige.', link: 'https://www.property24.co.ke/3-bedroom-apartment-flat-for-sale-in-kizingo-116394034',
    amenities: [{ icon: Landmark, text: 'Close to Old Town' }, { icon: Building, text: 'Gated Access' }, { icon: Home, text: 'Classic Design' }],
    dueDiligence: 'Kizingo is highly sought after by established families and corporate tenants.', breakdown: [{ title: 'Prestige Value', content: "Value is driven by the exclusive location near Mombasa's administrative center." }],
  },
  {
    id: 'a4_kizingo_3br_2', type: 'apartment', location: 'Kizingo', subLocation: 'Mombasa', size: '3 Bedroom Unit (Sea View)', price: 'KES 18,000,000',
    keyNote: 'Exclusive ocean-view properties, premium rental potential.', link: 'https://www.property24.co.ke/3-bedroom-apartment-flat-for-sale-in-kizingo-116190799',
    amenities: [{ icon: Landmark, text: 'Expansive Sea Views' }, { icon: Building, text: 'Elevated Pools' }, { icon: Home, text: 'All En-suite' }],
    dueDiligence: 'Verify view quality. Premium segment targets high-net-worth individuals.', breakdown: [{ title: 'Key Features', content: 'These units often feature private balconies and superior finishing materials.' }],
  },


  {
    id: 'a5_rosslyn_2br', type: 'apartment', location: 'Rosslyn', subLocation: 'Nairobi', size: '2 Bedroom Diplomatic Suite', price: 'KES 28,000,000',
    keyNote: 'Diplomatic Zone Focus, high security and excellent management.', link: 'https://www.property24.co.ke/2-bedroom-apartment-flat-for-sale-in-rosslyn-116069651',
    amenities: [{ icon: Zap, text: '24/7 Power Backup' }, { icon: Building, text: 'Rooftop Lounge' }, { icon: Home, text: 'High Security' }],
    dueDiligence: 'Target market is expatriates and UN staff; rent is typically quoted in USD.', breakdown: [{ title: 'Investment Rationale', content: 'Proximity to UN/Embassies ensures steady demand for high-end, secure rentals.' }],
  },

  {
    id: 'a6_lavington_3br', type: 'apartment', location: 'Lavington', subLocation: 'Nairobi', size: '3 Bedroom Unit', price: 'KES 17,500,000',
    keyNote: 'Proven rental corridor, immediate income potential.', link: 'https://www.property24.co.ke/3-bedroom-apartment-flat-for-sale-in-lavington-116606406',
    amenities: [{ icon: Wallet, text: 'Flexible Payment Plans' }, { icon: CheckCircle, text: 'Proximity to Malls' }, { icon: Home, text: 'Borehole Water' }],
    dueDiligence: 'Differentiation through quality finishing and strong management is key in this competitive area.', breakdown: [{ title: 'Investment Rationale', content: 'Established, high-demand residential area with excellent connectivity to schools and hospitals.' }],
  }
];


const SinglePropertyCard = ({ item }) => (
  <div className={`bg-white/30 bg-blur p-6 rounded-xl shadow-lg  mb-8 ${item.type === 'land' ? 'border-green-600' : 'border-blue-600'}`}>
    <div className="pb-4 mb-4 border-b border-gray-200">
      <h2 className="text-2xl font-extrabold text-green-500 leading-tight">{item.title}</h2>
      <p className="text-lg text-amber-200 mt-1">
        {item.location} {item.subLocation && `(${item.subLocation})`} • {item.size}
      </p>
      <p className="text-3xl font-black text-yellow-600 mt-2">{item.price}</p>
    </div>
    
    <p className="text-sm font-semibold text-yellow-600 mb-4 flex items-center">
        <AlertTriangle className="h-4 w-4 mr-2" />
        {item.keyNote}
    </p>
    <div className="flex flex-col gap-3   text-white text-sm mb-6">
        {(item.amenities || []).map((amenity, index) => (
            <span key={index} className="flex items-center ">
                <amenity.icon className="h-4 w-4 mr-2 text-indigo-400" />
                {amenity.text}
            </span>
        ))}
    </div>

    <h3 className="text-xl font-bold text-gray-800 mb-2">Details</h3>
    <div className="space-y-4">
      {item.breakdown.map((point, index) => (
        <div key={index} className="border-l-4 border-indigo-400 pl-3 bg-gray-50/50 p-2 rounded-r-lg">
          <p className="text-sm font-bold text-gray-700 mb-1">{point.title}</p>
          <p className="text-gray-600 text-xs">{point.content}</p>
        </div>
      ))}
    </div>
     <div className="mt-6 p-3 rounded-lg bg-yellow-50/50">
        <p className="text-xs font-semibold text-yellow-800 flex items-center">
            <Scale className="h-4 w-4 mr-2" />
            Due Diligence:
        </p>
        <p className="text-xs mt-1 text-yellow-700">{item.dueDiligence}</p>
    </div>

  
    <div className="mt-6">
        <a 
            href={item.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className=" py-3 px-4 bg-indigo-600 px-3 text-white font-bold rounded-lg shadow-xl hover:bg-indigo-700 transition-colors flex items-center justify-center text-sm"
        >
            <MapPin className="h-4 w-4 mr-2" />
            View Full Listing
        </a>
    </div>
  </div>
);



const PropertyDisplayView = ({ idOrLocation, navigateBack }) => {
    
    const allLocations = useMemo(() => {
        const landLocs = INVESTMENT_DATA.filter(i => i.type === 'land').map(i => i.location);
        const aptLocs = INVESTMENT_DATA.filter(i => i.type === 'apartment').map(i => i.location);
        return [...new Set([...landLocs, ...aptLocs])];
    }, []);

    const isGroup = allLocations.includes(idOrLocation);
    
    let propertiesToRender = [];
    let pageTitle = '';

    if (isGroup) {
        propertiesToRender = INVESTMENT_DATA.filter(item => item.location === idOrLocation);
        

        const type = propertiesToRender[0]?.type === 'land' ? 'Land' : 'Apartment';
        pageTitle = `${idOrLocation} ${type} Opportunities (${propertiesToRender.length})`;

    } else {
        const singleItem = INVESTMENT_DATA.find(item => item.id === idOrLocation);
        if (singleItem) {
            propertiesToRender.push(singleItem);
            pageTitle = singleItem.title;
        } else {
            return <div className="text-red-500 text-center p-10 bg-white rounded-xl shadow-lg">Error: Item or group not found.</div>;
        }
    }

    return (
        <div className="mb-12 w-full flex-flex-col ">
            <button
                onClick={navigateBack}
                className="mb-6 inline-flex items-center text-gray-200 hover:text-white font-semibold  p-3  rounded-lg shadow-md"
            >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Investment Options
        </button>
        <div className='flex flex-col items-center justify-center px-3 py-2 mt-4'>
          <h1 className="text-3xl font-extrabold text-white mb-6 p-4 rounded-xl  shadow-xl">
                {pageTitle}
            </h1>

            {/* Render the cards */}
            <div className="space-y-8">
                {propertiesToRender.map(item => (
                    <SinglePropertyCard key={item.id} item={item} />
                ))}
            </div></div>
            
        </div>
    );
};



const GrowthCarousel = ({ areas }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const GrowthCard = ({ item }) => (
    <div className="flex-shrink-0 w-80 md:w-96 snap-center bg-white/20 p-6 rounded-xl shadow-lg  text-gray-800">
        <h3 className="text-xl font-bold mb-2 text-green-500">{item.region}</h3>
        <p className="text-xs text-yellow-500 mb-3">{item.detail}</p>
        
        <div className="space-y-2 mb-4">
            <p className="flex items-center text-sm text-indigo-500 font-medium">
                <Building className="h-4 w-4 mr-2 text-gray-500" />
                Infrastructure: {item.infrastructure}
            </p>
        </div>

        <div className="flex flex-col  items-center pt-3 border-t border-gray-200 justify-center">
             <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                <TrendingUp className="w-3 h-3 mt-0.5 mr-1" />
                {item.outlook}
            </span>
            {item.metrics.map((metric, index) => (
                <div key={index} className="text-center w-full flex flex-col text-white justify-center items-center">
                    <p className="text-sm w-full font-thin text-white pt-3">{metric.value}</p>
                    <p className="text-xs  w-full text-gray-500">{metric.title}</p>
                </div>
            ))}
        </div>
    </div>
  );

  return (
    <div className="relative">
      <div 
        ref={scrollRef} 
        className="flex overflow-x-auto space-x-4 p-4 -m-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {areas.map((item, index) => (
          <GrowthCard key={index} item={item} />
        ))}
      </div>
      
      <button 
        onClick={() => scroll('left')} 
        className="absolute left-0 top-1/2 -mt-6 p-2 bg-white rounded-full shadow-lg z-10 hover:bg-gray-100 hidden md:block"
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-5 w-5 text-indigo-600" />
      </button>
      <button 
        onClick={() => scroll('right')} 
        className="absolute right-0 top-1/2 -mt-6 p-2 bg-white rounded-full shadow-lg z-10 hover:bg-gray-100 hidden md:block"
        aria-label="Scroll right"
      >
        <ChevronRight className="h-5 w-5 text-indigo-600" />
      </button>


        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
    </div>
  );
};

const InvestmentAccordion = ({ title, itemsToDisplay, investmentData, onSelectInvestment }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const isLand = title.includes('Land');
  const displayItems = useMemo(() => {
    return itemsToDisplay.map(location => ({
        idOrLocation: location,
        title: location + ' Properties',
        subtitle: `${investmentData.filter(i => i.location === location && (isLand ? i.type === 'land' : i.type === 'apartment')).length} listings available`,
        type: 'location',
    }));
  }, [itemsToDisplay, investmentData, isLand]);


  return (
    <div className="border border-indigo-400 rounded-xl overflow-hidden shadow-lg mb-4">
      <button
        className={`w-full flex justify-between items-center p-5 font-bold text-lg transition-colors ${isOpen ? `bg-indigo-100 text-indigo-900` : 'bg-white text-gray-800 hover:bg-gray-50'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        {isOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
      </button>
      {isOpen && (
        <div className="bg-white border-t border-indigo-200">
          <ul className="divide-y divide-indigo-50">
            {displayItems.map((item) => (
              <li 
                key={item.idOrLocation}
                className="p-4 cursor-pointer hover:bg-indigo-50 transition-colors flex justify-between items-center"
                onClick={() => onSelectInvestment(item.idOrLocation)}
              >
                <div>
                    <span className="text-gray-700 font-medium block">{item.title}</span>
                    <span className="text-gray-500 text-sm">{item.subtitle}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-indigo-500" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'detail'
  const [selectedIdOrLocation, setSelectedIdOrLocation] = useState(null); // Holds an ID (apartment) or Location (land)

  const navigateToDetails = (idOrLocation) => {
    setSelectedIdOrLocation(idOrLocation);
    setCurrentView('detail');
  };

  const navigateBack = () => {
    setCurrentView('list');
    setSelectedIdOrLocation(null);
  };

  const landLocations = useMemo(() => {
    const locations = INVESTMENT_DATA.filter(i => i.type === 'land').map(i => i.location);
    return [...new Set(locations)]; 
  }, []);

  const apartmentLocations = useMemo(() => {
    const locations = INVESTMENT_DATA.filter(i => i.type === 'apartment').map(i => i.location);
    return [...new Set(locations)]; 
  }, []);


  const renderContent = () => {
    if (currentView === 'detail' && selectedIdOrLocation) {
      return <PropertyDisplayView idOrLocation={selectedIdOrLocation} navigateBack={navigateBack} />;
    }

    return (
      <>
        <div className="mb-10 text-center w-full  ">
            <h1 className="text-3xl font-extrabold text-white mb-4">
                Hello vee!
          </h1>
          <p className="text-indigo-200 text-lg max-w-2xl mx-auto">
            This is a quick rundown of what I have been finding out since Wednesday. We can go over a detailed version on call.
          </p>
            <p className=" text-sm pt-4 text-green-400 max-w-2xl mx-auto">
                I have done the due diligence on all the listings available here. I will be updating them as I get more.
            </p>
        </div>
        
        <section className="mb-12 flex items-center flex-col w-full">
          <h2 className="text-2xl font-bold text-white border-b border-indigo-600 pb-2 mb-6 flex justify-center items-center">
            
            Potential Growth Areas: Where Capital is Moving
          </h2>
          <div className='w-full lg:w-4/5  hide-scroll-xy'><GrowthCarousel areas={GROWTH_AREAS_DATA} /></div>
          
        </section>

        <section className='w-full px-1 flex flex-col items-center'>
          <section className="mb-12 bg-white/30 bg-blur p-6 rounded-xl  shadow-2xl md:w-4/5">
            <h2 className="text-2xl font-bold text-gray-800  border-indigo-400 pb-2 mb-6 w-full justify-center flex items-center">
                <Wallet className="h-5 w-5 mr-2 text-indigo-600" />
                Curated Investment Opportunities
            </h2>
            
            <InvestmentAccordion 
                title="Land Investments" 
                itemsToDisplay={landLocations} 
                investmentData={INVESTMENT_DATA} 
                onSelectInvestment={navigateToDetails} 
            />
            
            <InvestmentAccordion 
                title="Apartment Investments" 
                itemsToDisplay={apartmentLocations} 
                investmentData={INVESTMENT_DATA} 
                onSelectInvestment={navigateToDetails} 
            />
        </section>
        </section>

        

        <div className="mb-10 mt-10 p-6 rounded-xl shadow-md text-center  w-full">
          <p className="text-lg font-semibold text-gray-200 mb-2">I am ready to start making calls to the agents who posted the listings. On your word I can reach out and start planning site visits.</p>
           <p className="text-lg font-semibold text-red-500 mb-2">I have avoided Nairobi apartments for now, because of your interest in coast, but I can still add them to the list (I did check out Tsavo)</p>
          <p className="text-sm text-indigo-600 mb-4">
            We can talk about what I need to make this work then.
          </p>

          <p className="text-sm text-indigo-600 mb-4">
            We can also talk about other locations I found that drew my interest. Like Naivasha, Nanyuki and Nakuru.
          </p>
         
        </div>
      </>
    );
  };

  return (
    <div style={{ backgroundColor: PRIMARY_NAVY }} className="min-h-screen w-screen font-sans">
      <script src="https://cdn.tailwindcss.com"></script>

      <main className="w-full px-4 sm:px-6 lg:px-8 py-10">
        {renderContent()}
      </main>

      <footer className="bg-gray-900 text-white py-6">
        <div className="w-full px-4 text-center text-sm">
          <p>&copy; 2025 . By Reagan</p>
        </div>
      </footer>
    </div>
  );
};

export default App;