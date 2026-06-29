"use client";
import Script from "next/script";

const BlogFeed = () => {
  return (
    <section className="bg-transparent py-24 md:py-32 relative overflow-hidden" id="blog">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-12 h-[1px] bg-[#00d1b2]"></div>
          <p className="text-[#00d1b2] font-mono text-sm tracking-widest uppercase">Writings</p>
        </div>
        
        <h2 className="text-5xl md:text-7xl font-display italic text-text-primary mb-12 uppercase tracking-wide">
          Latest <span className="text-[#00d1b2] block md:inline mt-2 md:mt-0">Articles</span>
        </h2>
        
        {/* OSMO Blog Feed Widget */}
        <div id="osmo-blog-feed" data-workspace="9acec945-80e9-4ce8-bfd4-cd776c3df620" data-limit="5"></div>
        <Script src="https://osmo.backend.commerciax.com/embed/blog-feed.js" strategy="lazyOnload" />
      </div>
    </section>
  );
};

export default BlogFeed;
