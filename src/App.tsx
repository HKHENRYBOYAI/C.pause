import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ChevronRight, Menu, X, ArrowUpRight, Instagram, Facebook, MapPin, Clock, Calendar } from 'lucide-react';
import Lenis from 'lenis';

interface ProductItem {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: 1,
    name: "刺Tong 系列",
    category: "刺品",
    description: "將刺的語言轉化為身心的觸動。獨特的外型與內在的韌性。",
    image: "https://images.unsplash.com/photo-1519336367661-eba9c1dfa5e9?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 2,
    name: "放鬆舒壓組",
    category: "護理",
    description: "在繁忙中暫停，與植物共生的靜謐時光。結合天然植萃的療癒。",
    image: "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 3,
    name: "限量仙人掌盆栽",
    category: "植物養育",
    description: "每一株都是生命力的展現，適合居家或辦公空間的綠色風景。",
    image: "https://images.unsplash.com/photo-1520302630591-fd1c66ed11dd?auto=format&fit=crop&q=80&w=1000"
  }
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? 'py-4 glass border-b border-primary/20' : 'py-8 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-widest uppercase flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
             <span className="text-black text-xs font-black">C</span>
          </div>
          C.PAUSE 刺日談
        </motion.div>

        <div className="hidden md:flex items-center gap-12 font-sans text-xs uppercase tracking-[0.3em] font-medium">
          {['關於刺日談', '海邊有刺', '刺品專區', '暫停筆記'].map((item) => (
            <a key={item} href="#" className="hover:text-primary transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button className="hidden sm:flex items-center gap-2 bg-accent text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
            預約體驗 <Calendar size={14} />
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 bg-bg-dark z-40 md:hidden pt-32 px-10 flex flex-col gap-10"
          >
            {['關於刺日談', '海邊有刺', '刺品專區', '暫停筆記'].map((item, idx) => (
              <motion.a
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.1 * idx } }}
                href="#"
                className="text-4xl font-serif italic text-white hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 1000], [0, 400]);
  const yText = useTransform(scrollY, [0, 1000], [0, -150]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 800], [1.1, 1]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div 
        style={{ y: yImage, scale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-bg-dark z-10" />
        <img 
          src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&q=80&w=2600" 
          alt="Cactus landscape" 
          className="w-full h-full object-cover scale-110"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-20 pointer-events-none">
        <motion.div
          style={{ y: yText, opacity }}
          className="max-w-5xl"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-primary text-xs uppercase tracking-[0.5em] font-bold mb-6 block"
          >
            請允許自己暫時停下來
          </motion.span>
          
          <h1 className="text-7xl md:text-[10vw] font-serif italic leading-[0.75] mb-12 select-none">
            找回安靜 <br /> 
            <span className="text-stroke text-white italic">呼吸的節奏</span>
          </h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col md:flex-row items-start md:items-center gap-12"
          >
            <p className="text-neutral-300 max-w-sm text-lg leading-relaxed font-light">
              在刺與刺的間隙中，尋找最柔軟的喘息。
              刺日談 C.Pause，將仙人掌的堅韌轉化為生活的靜謐。
            </p>
            <motion.button 
              className="pointer-events-auto bg-primary text-black px-12 py-5 rounded-full text-xs uppercase tracking-[0.3em] hover:bg-accent hover:text-white transition-all duration-500 group flex items-center gap-4 font-bold"
            >
              進入品牌中心
              <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 italic">Scroll Down</span>
        <div className="w-[1px] h-24 bg-gradient-to-b from-primary/40 to-transparent" />
      </motion.div>
    </section>
  );
};

const PhilosophySection = () => {
  return (
    <section className="py-48 container mx-auto px-6 border-b border-white/5">
       <div className="max-w-4xl mx-auto text-center">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-accent text-xs uppercase tracking-[0.6em] font-bold mb-12 block"
          >
            品牌哲學 | Philosophy
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-serif italic mb-16 leading-tight">
            每一根刺，<br />都是對生命的<span className="text-primary italic">執著與保護</span>
          </h2>
          <p className="text-neutral-400 text-lg leading-relaxed mb-12 font-light">
            我們相信，美不應該只有溫柔，堅強而有稜角的仙人掌，
            正是現代人在焦慮世界中，最真實的寫照。
            在這裡，我們學習在喧囂中暫停，聽見刺日談的聲音。
          </p>
          <div className="w-20 h-[1px] bg-primary mx-auto" />
       </div>
    </section>
  );
}

const CoastEntrance = () => {
  return (
    <section className="relative h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1544943961-bb288ad8c5ca?auto=format&fit=crop&q=80&w=2000" 
          alt="Coastal cacti" 
          className="w-full h-full object-cover grayscale-[0.5] hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl bg-bg-dark/80 backdrop-blur-xl p-12 md:p-20 border border-white/10 rounded-[3rem]">
          <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold mb-6 block">海邊有刺 Prickly Coast</span>
          <h2 className="text-4xl md:text-6xl font-serif italic text-white mb-8">
            實體策展空間 <br /> <span className="text-accent">現正開放</span>
          </h2>
          <p className="text-neutral-400 mb-12 leading-relaxed">
            這不只是一個園區，這是一場關於五感的策展。
            在海風與尖刺之間，體驗餐飲、選物與心靈的對話。
          </p>
          <button className="flex items-center gap-4 text-xs uppercase tracking-widest font-bold group">
            預約入場 <ChevronRight size={16} className="text-primary group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}

const ProductSection = () => {
  return (
    <section className="py-48 container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-8">
        <div>
          <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold mb-4 block">商品專區 | Products</span>
          <h2 className="text-6xl md:text-[8vw] font-serif italic text-stroke text-white leading-[0.8]">
            精選刺品
          </h2>
        </div>
        <div className="flex gap-4">
          {['刺Tong', '放鬆', '護理', '養育'].map(filter => (
            <button key={filter} className="text-[10px] uppercase tracking-widest border border-white/10 px-8 py-3 rounded-full hover:border-primary hover:text-primary transition-colors">
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {PRODUCTS.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-neutral-900 mb-8 relative">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-700" />
              <div className="absolute bottom-8 left-8">
                <span className="glass px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold">{product.category}</span>
              </div>
            </div>
            <h3 className="text-3xl font-serif italic mb-4 group-hover:text-primary transition-colors">{product.name}</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">{product.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const ArticleSection = () => {
  const articles = [
    { title: "如何在仙人掌中看見溫柔", tag: "創辦人随筆" },
    { title: "沙漠植栽與室內美學的平衡", tag: "設計師對談" },
    { title: "海邊有刺：二週年特刊", tag: "品牌活動" }
  ];

  return (
    <section className="py-48 bg-black/40">
      <div className="container mx-auto px-6">
        <div className="mb-24">
          <span className="text-accent text-xs uppercase tracking-[0.5em] font-bold mb-4 block">文章專區 | Notes</span>
          <h2 className="text-5xl font-serif italic">暫停筆記</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-12">
          {articles.map((article, i) => (
             <motion.div 
               key={i}
               whileHover={{ x: 20 }}
               className="border-b border-white/10 pb-12 flex justify-between items-center group cursor-pointer"
             >
               <div>
                  <span className="text-primary text-[10px] uppercase tracking-widest font-bold mb-4 block">{article.tag}</span>
                  <h4 className="text-3xl md:text-5xl font-serif italic group-hover:text-primary transition-colors">{article.title}</h4>
               </div>
               <ArrowUpRight size={40} className="text-white/20 group-hover:text-primary transition-all group-hover:rotate-45" />
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const InfoSection = () => {
  return (
    <section className="py-48 container mx-auto px-6">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
          <div>
            <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold mb-8 block">海邊有刺資訊</span>
            <div className="space-y-12">
               <div className="flex gap-6">
                  <MapPin className="text-primary mt-1" size={24} />
                  <div>
                    <h5 className="text-xl font-serif italic mb-2">地址 Location</h5>
                    <p className="text-neutral-400 font-light">海岸線二段 315 號，鄰近刺之彼岸。</p>
                  </div>
               </div>
               <div className="flex gap-6">
                  <Clock className="text-primary mt-1" size={24} />
                  <div>
                    <h5 className="text-xl font-serif italic mb-2">開放時間 Hours</h5>
                    <p className="text-neutral-400 font-light">週二至週日 11:00 - 19:30 (週一休館)</p>
                  </div>
               </div>
               <div className="flex gap-6">
                  <Calendar className="text-primary mt-1" size={24} />
                  <div>
                    <h5 className="text-xl font-serif italic mb-2">預約方式 Booking</h5>
                    <p className="text-neutral-400 font-light">僅限官方網站預約，不提供現場候位。</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="relative aspect-square rounded-[3rem] overflow-hidden grayscale">
             <img 
               src="https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=1000" 
               alt="Entrance" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-accent/20 mix-blend-overlay" />
          </div>
       </div>
    </section>
  );
}

const Footer = () => {
  return (
    <footer className="bg-bg-dark pt-48 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-20 mb-32">
          <div className="max-w-md">
            <h2 className="text-5xl font-bold tracking-tighter uppercase mb-8">C.PAUSE</h2>
            <p className="text-neutral-500 text-lg leading-relaxed mb-12 italic">
              "在焦慮的世界中，仙人掌教會我們如何用刺保護初心。"
            </p>
            <div className="flex gap-8">
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-24">
            <div className="flex flex-col gap-6">
              <span className="text-neutral-700 uppercase tracking-widest text-[10px] font-bold">Discover</span>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm font-light">關於刺日談</a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm font-light">海邊有刺</a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm font-light">刺品目錄</a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm font-light">場域策展</a>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-neutral-700 uppercase tracking-widest text-[10px] font-bold">Member</span>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm font-light">預約紀錄</a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm font-light">刺品配送</a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm font-light">隱私權政策</a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors text-sm font-light">人才招募</a>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] uppercase tracking-[0.3em] text-neutral-600 font-bold">
          <p>© 2026 C.PAUSE 刺日談. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-12">
            <a href="#" className="hover:text-white transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-white transition-colors">TERMS</a>
            <a href="#" className="hover:text-white transition-colors">COOKIES</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <main className="bg-bg-dark font-sans selection:bg-primary selection:text-black overflow-x-hidden">
      <Header />
      <Hero />
      
      {/* Philosophy */}
      <PhilosophySection />

      {/* Marquee */}
      <div className="py-12 bg-accent/10 backdrop-blur-sm border-y border-white/5 overflow-hidden whitespace-nowrap flex">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-20 pr-20 shrink-0 text-[10px] uppercase tracking-[0.5em] text-primary font-black italic"
        >
          {Array(8).fill(0).map((_, i) => (
            <React.Fragment key={i}>
              <span>Prickly Coast Experience</span>
              <span className="w-2 h-2 bg-accent rounded-full" />
              <span>Breathing with Cacti</span>
              <span className="w-2 h-2 border border-primary rounded-full" />
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      <CoastEntrance />
      <ProductSection />
      <ArticleSection />
      <InfoSection />
      
      <Footer />
    </main>
  );
}
