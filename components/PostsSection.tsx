'use client';

export default function PostsSection() {
  const posts = [
    {
      id: 1,
      title: '探索未知的旅程',
      excerpt: '生活就像一场冒险，每一步都充满惊喜。今天想和大家分享我最近的一些思考和感悟...',
      date: '2024年1月15日',
      category: '生活随笔',
      image: 'https://readdy.ai/api/search-image?query=Serene%20mountain%20landscape%20at%20golden%20hour%20with%20winding%20path%20leading%20into%20distance%2C%20dreamy%20purple%20and%20pink%20sky%2C%20peaceful%20and%20inspiring%20atmosphere%2C%20professional%20nature%20photography%20with%20soft%20focus&width=600&height=400&seq=post-journey&orientation=landscape',
      readTime: '5分钟'
    },
    {
      id: 2,
      title: '创意的火花',
      excerpt: '灵感往往在最意想不到的时刻降临。记录下这些珍贵的创意瞬间，让思维的碰撞产生更多可能...',
      date: '2024年1月12日',
      category: '创作分享',
      image: 'https://readdy.ai/api/search-image?query=Creative%20art%20supplies%20and%20sketches%20on%20white%20desk%2C%20colorful%20paint%20palette%2C%20brushes%20and%20pencils%2C%20bright%20natural%20lighting%2C%20artistic%20and%20inspiring%20workspace%2C%20soft%20purple%20accents&width=600&height=400&seq=post-creative&orientation=landscape',
      readTime: '4分钟'
    },
    {
      id: 3,
      title: '时光的印记',
      excerpt: '翻看旧照片，回忆涌上心头。那些被定格的瞬间，承载着我们最珍贵的记忆和情感...',
      date: '2024年1月8日',
      category: '摄影日记',
      image: 'https://readdy.ai/api/search-image?query=Vintage%20polaroid%20photos%20scattered%20on%20wooden%20surface%20with%20dried%20flowers%2C%20nostalgic%20and%20warm%20atmosphere%2C%20soft%20lighting%2C%20purple%20and%20cream%20color%20tones%2C%20lifestyle%20photography&width=600&height=400&seq=post-memory&orientation=landscape',
      readTime: '6分钟'
    },
    {
      id: 4,
      title: '阅读的力量',
      excerpt: '书籍是通往另一个世界的窗口。分享我最近读过的好书，以及它们带给我的启发和思考...',
      date: '2024年1月5日',
      category: '读书笔记',
      image: 'https://readdy.ai/api/search-image?query=Stack%20of%20books%20with%20coffee%20cup%20on%20cozy%20reading%20nook%2C%20warm%20ambient%20lighting%2C%20comfortable%20blanket%2C%20peaceful%20and%20inviting%20atmosphere%2C%20soft%20purple%20and%20beige%20tones&width=600&height=400&seq=post-reading&orientation=landscape',
      readTime: '7分钟'
    },
    {
      id: 5,
      title: '音乐与心情',
      excerpt: '每首歌都有它的故事，每个旋律都能触动心弦。今天想和你分享那些陪伴我的音乐...',
      date: '2024年1月2日',
      category: '音乐分享',
      image: 'https://readdy.ai/api/search-image?query=Vintage%20headphones%20and%20vinyl%20records%20on%20minimalist%20desk%2C%20soft%20purple%20lighting%2C%20music%20notes%20floating%20in%20air%2C%20dreamy%20and%20artistic%20atmosphere%2C%20modern%20lifestyle%20photography&width=600&height=400&seq=post-music&orientation=landscape',
      readTime: '5分钟'
    },
    {
      id: 6,
      title: '成长的足迹',
      excerpt: '回顾过去一年的成长历程，有欢笑也有泪水，但每一步都让我变得更加坚强和成熟...',
      date: '2023年12月28日',
      category: '个人成长',
      image: 'https://readdy.ai/api/search-image?query=Person%20standing%20on%20mountain%20peak%20at%20sunrise%2C%20arms%20raised%20in%20victory%2C%20inspiring%20landscape%20view%2C%20purple%20and%20golden%20sky%2C%20motivational%20and%20uplifting%20atmosphere%2C%20professional%20photography&width=600&height=400&seq=post-growth&orientation=landscape',
      readTime: '8分钟'
    }
  ];

  return (
    <section id="posts" className="py-24 px-6 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">最新动态</h2>
          <div className="w-20 h-1 bg-purple-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            记录生活的点点滴滴，分享我的思考与感悟
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article 
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <i className="ri-calendar-line mr-2"></i>
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <i className="ri-time-line mr-2"></i>
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-purple-600 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                
                <button className="text-purple-600 font-semibold hover:text-purple-700 transition-colors flex items-center whitespace-nowrap cursor-pointer">
                  阅读全文
                  <i className="ri-arrow-right-line ml-2"></i>
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-all duration-300 hover-lift shadow-lg whitespace-nowrap cursor-pointer">
            查看更多动态
          </button>
        </div>
      </div>
    </section>
  );
}
