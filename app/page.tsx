/**
 * StellarVote - Gelişmiş DAO Platformu v2.2
 * * GÜNCELLEME:
 * - Oy kullanılmamış seçeneklerin yazı rengi beyaz yapıldı (Okunabilirlik düzeltmesi).
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';

// --- IKONLAR (Inline SVG) ---
const Icons = {
  Vote: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 12 2 2 4-4"/><path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z"/><path d="M22 19H2"/></svg>
  ),
  Users: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  History: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
  ),
  Wallet: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></svg>
  ),
  CheckCircle: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
  ),
  Loader2: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
  ),
  ArrowRight: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  ),
  LogOut: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
  ),
  Plus: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  ),
  Award: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
  ),
  Lock: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  ),
  QrCode: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>
  ),
  MessageSquare: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  ),
  BarChart: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>
  ),
  EyeOff: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
  ),
};

// --- MOCK DATA ---

const INITIAL_POLLS = [
  {
    id: 1,
    community: "Üniversite E-Spor Kulübü",
    title: "Bahar Dönemi Turnuvası",
    description: "Bu dönem hangi oyunun turnuvasını düzenleyelim?",
    participants: 1240,
    requiredToken: null, 
    options: [
      { name: "Valorant", address: "GDX...VALORANT", memo: "Valorant Vote", votes: 750 },
      { name: "CS:GO 2", address: "GCK...CSGO2", memo: "CSGO Vote", votes: 490 }
    ],
    comments: [
      { user: "GAT...U1", text: "Kesinlikle CS2 olmalı, Valorant sıktı artık.", time: "10dk önce" },
      { user: "GBZ...U2", text: "Okulun PC'leri Valorant'ı daha iyi kaldırıyor.", time: "1s önce" }
    ],
    color: "purple"
  },
  {
    id: 2,
    community: "DAO Yönetim Kurulu (Özel)",
    title: "Varlık Fonu Dağıtımı",
    description: "Hazine fonunun %20'si hangi DeFi protokolüne kilitlensin?",
    participants: 45,
    requiredToken: "BOARD_MEMBER",
    options: [
      { name: "Y-Pool (High Yield)", address: "GBZ...YIELD", memo: "Yield Vote", votes: 30 },
      { name: "S-Pool (Stable)", address: "GDQ...STABLE", memo: "Stable Vote", votes: 15 }
    ],
    comments: [],
    color: "amber"
  },
  {
    id: 3,
    community: "Yeşil Kampüs Derneği",
    title: "Bağış Fonu Kullanımı",
    description: "Toplanan bağışlar öncelikle nereye harcansın?",
    participants: 856,
    requiredToken: null,
    options: [
      { name: "Fidan Dikimi", address: "GBZ...TREE", memo: "Fidan Vote", votes: 300 },
      { name: "Geri Dönüşüm", address: "GDQ...RECYCLE", memo: "Recycle Vote", votes: 556 }
    ],
    comments: [
      { user: "GDQ...U9", text: "Kampüs çok betonlaştı, ağaç lazım.", time: "2 gün önce" }
    ],
    color: "emerald"
  }
];

const MOCK_BADGES = [
  { id: 1, name: "İlk Oy", icon: "🌱", desc: "İlk kez bir oylamaya katıldın." },
  { id: 2, name: "DAO Uzmanı", icon: "🧠", desc: "5 farklı toplulukta oy kullandın." },
  { id: 3, name: "Erken Benimseyen", icon: "🚀", desc: "Sistem açıldığı hafta katıldın." },
  { id: 4, name: "Balina", icon: "🐋", desc: "Yüksek hacimli bir oylamaya katıldın." },
];

// --- MOCK STELLAR HELPER ---
const mockStellar = {
  connect: () => new Promise<{key: string, tokens: string[]}>((resolve) => {
    setTimeout(() => resolve({ key: 'GDT3...VOTE_USER', tokens: ['USDC', 'XLM'] }), 800);
  }),
  getBalance: () => new Promise<string>((resolve) => {
    setTimeout(() => resolve('15.00'), 500);
  }),
  sendPayment: (dest: string, memo: string) => new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 2000);
  })
};

// --- BİLEŞENLER ---

const QRModal = ({ address, onClose }: { address: string, onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={onClose}>
    <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center" onClick={e => e.stopPropagation()}>
      <h3 className="text-gray-900 font-bold text-lg mb-4">Mobil Cüzdanla Tara</h3>
      <div className="bg-white p-2 rounded-lg border-2 border-dashed border-gray-300 mx-auto w-48 h-48 flex items-center justify-center mb-4">
        <div className="grid grid-cols-5 gap-1 w-full h-full opacity-80">
          {[...Array(25)].map((_, i) => (
            <div key={i} className={`bg-black ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'} rounded-sm`} />
          ))}
        </div>
      </div>
      <p className="text-gray-500 text-xs font-mono break-all bg-gray-100 p-2 rounded">{address}</p>
      <button onClick={onClose} className="mt-4 w-full py-2 bg-gray-900 text-white rounded-lg font-medium">Kapat</button>
    </div>
  </div>
);

const PollChart = ({ options, totalVotes }: { options: any[], totalVotes: number }) => {
  return (
    <div className="space-y-3 mt-4 bg-black/20 p-4 rounded-xl animate-in fade-in slide-in-from-top-2 duration-500">
      <h5 className="text-white/70 text-xs font-semibold uppercase flex items-center gap-2">
        <Icons.BarChart className="w-4 h-4" />
        Canlı Sonuçlar (Oyun Eklendi)
      </h5>
      {options.map((opt, idx) => {
        const percentage = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
        return (
          <div key={idx} className="relative">
            <div className="flex justify-between text-xs text-white/80 mb-1">
              <span>{opt.name}</span>
              <span>%{percentage} ({opt.votes})</span>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Kilitli Sonuç Ekranı
const LockedResults = () => (
  <div className="mt-4 bg-black/20 p-6 rounded-xl border border-white/5 border-dashed flex flex-col items-center justify-center text-center gap-2 h-32 group hover:bg-black/30 transition-colors">
    <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
      <Icons.EyeOff className="w-5 h-5 text-white/40" />
    </div>
    <span className="text-xs text-white/60 font-medium">
      Sonuçları görmek için oy kullanmalısın.
    </span>
  </div>
);

const CommentSection = ({ comments }: { comments: any[] }) => {
  const [newComment, setNewComment] = useState("");
  const [localComments, setLocalComments] = useState(comments);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setLocalComments([{ user: "Sen", text: newComment, time: "Şimdi" }, ...localComments]);
    setNewComment("");
  };

  return (
    <div className="mt-6 border-t border-white/10 pt-4">
      <h5 className="text-white/70 text-xs font-semibold uppercase mb-3 flex items-center gap-2">
        <Icons.MessageSquare className="w-4 h-4" />
        Tartışma ({localComments.length})
      </h5>
      
      <div className="space-y-3 max-h-40 overflow-y-auto custom-scrollbar mb-4">
        {localComments.length === 0 && <p className="text-white/30 text-xs italic">Henüz yorum yok. İlk yorumu sen yap!</p>}
        {localComments.map((c, i) => (
          <div key={i} className="flex gap-2 text-sm">
            <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-[10px] text-indigo-400 font-bold shrink-0">
              {c.user.substring(0, 2)}
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-white/90 font-medium text-xs">{c.user}</span>
                <span className="text-white/30 text-[10px]">{c.time}</span>
              </div>
              <p className="text-white/60 text-xs">{c.text}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handlePost} className="flex gap-2">
        <input 
          type="text" 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Fikrini belirt..." 
          className="flex-1 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
        />
        <button type="submit" className="text-xs bg-indigo-600 px-3 py-1 rounded-lg text-white font-medium hover:bg-indigo-500">Gönder</button>
      </form>
    </div>
  );
};

const CreatePollForm = () => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-500">
      <h3 className="text-2xl font-bold text-white mb-6">Yeni Oylama Oluştur</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-white/60 text-sm mb-2">Topluluk Adı</label>
          <input type="text" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500" placeholder="Örn: Blockchain Kulübü" />
        </div>
        <div>
          <label className="block text-white/60 text-sm mb-2">Oylama Başlığı</label>
          <input type="text" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500" placeholder="Örn: Yeni Etkinlik Yeri" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white/60 text-sm mb-2">Seçenek 1</label>
            <input type="text" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-indigo-500" placeholder="Aday A" />
          </div>
          <div>
            <label className="block text-white/60 text-sm mb-2">Seçenek 2</label>
            <input type="text" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-indigo-500" placeholder="Aday B" />
          </div>
        </div>
        <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg mt-4">
          <Icons.Lock className="w-4 h-4 text-amber-500" />
          <span className="text-amber-200 text-xs">Akıllı kontrat oluşturma ücreti: 5 XLM</span>
        </div>
        <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-bold transition-all">
          Oylamayı Başlat
        </button>
      </div>
    </div>
  );
};

// --- ANA BİLEŞEN ---

export default function Home() {
  const [activeTab, setActiveTab] = useState<'polls' | 'create' | 'profile'>('polls');
  const [publicKey, setPublicKey] = useState<string>('');
  const [userTokens, setUserTokens] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [qrAddress, setQrAddress] = useState<string | null>(null);
  
  // Local state for Polls (Canlı artış için)
  const [polls, setPolls] = useState(INITIAL_POLLS);

  // Kullanıcının oy verdiği anketlerin ID'leri
  const [votedPolls, setVotedPolls] = useState<number[]>([]);
  
  // Şu anda oy kabininde olan anketin ID'si
  const [activePollId, setActivePollId] = useState<number | null>(null);

  const [selectedVote, setSelectedVote] = useState<{address: string, memo: string} | null>(null);
  const [myBadges, setMyBadges] = useState<number[]>([]);

  const walletSectionRef = useRef<HTMLDivElement>(null);
  const votingBoothRef = useRef<HTMLDivElement>(null);

  const handleConnect = async () => {
    const data = await mockStellar.connect();
    setPublicKey(data.key);
    setUserTokens(data.tokens);
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setPublicKey('');
    setUserTokens([]);
    setIsConnected(false);
    setSelectedVote(null);
    setVotedPolls([]); // Test için çıkış yapınca sıfırla
    setPolls(INITIAL_POLLS); // Test için oyları sıfırla
  };

  const handleVoteClick = (poll: typeof INITIAL_POLLS[0], option: any) => {
    if (!isConnected) {
      walletSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (votedPolls.includes(poll.id)) {
      alert("Bu ankette zaten oy kullandınız!");
      return;
    }

    if (poll.requiredToken && !userTokens.includes(poll.requiredToken)) {
      alert(`⚠️ Bu oylama kilitli! Oy kullanmak için cüzdanında '${poll.requiredToken}' tokeni olması gerekiyor.`);
      return;
    }

    setActivePollId(poll.id); // Hangi ankete oy verildiğini kaydet
    setSelectedVote({ address: option.address, memo: option.memo });
    
    setTimeout(() => {
       votingBoothRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const onPaymentSuccess = () => {
    if (activePollId !== null && selectedVote) {
      // 1. Anketi oylandı olarak işaretle
      setVotedPolls(prev => [...prev, activePollId]);
      
      // 2. Oyları güncelle (Simülasyon)
      setPolls(currentPolls => currentPolls.map(p => {
        if (p.id === activePollId) {
          return {
            ...p,
            options: p.options.map(opt => 
              opt.memo === selectedVote.memo ? { ...opt, votes: opt.votes + 1 } : opt
            ),
            participants: p.participants + 1
          };
        }
        return p;
      }));

      // 3. Rozet kontrolü
      if (!myBadges.includes(1)) {
        setMyBadges([...myBadges, 1]); 
        alert("🎉 Tebrikler! 'İlk Oy' NFT rozetini kazandın.");
      } else {
        alert("✅ Oyunuz blokzincire başarıyla işlendi!");
      }

      // 4. Temizlik
      setSelectedVote(null);
      setActivePollId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 font-sans selection:bg-indigo-500/30 pb-20">
      
      {/* QR Modal */}
      {qrAddress && <QRModal address={qrAddress} onClose={() => setQrAddress(null)} />}

      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-md bg-black/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('polls')}>
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-xl shadow-lg shadow-cyan-500/20 text-white">
                <Icons.Vote className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">StellarVote</h1>
                <p className="text-cyan-200/60 text-[10px] font-medium tracking-wider uppercase">DAO Platform v2.1</p>
              </div>
            </div>
            
            {/* Navigasyon (Desktop) */}
            <div className="hidden md:flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
              <button onClick={() => setActiveTab('polls')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'polls' ? 'bg-indigo-600 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
                Oylamalar
              </button>
              <button onClick={() => setActiveTab('create')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'create' ? 'bg-indigo-600 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
                Oylama Oluştur
              </button>
              <button onClick={() => setActiveTab('profile')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'profile' ? 'bg-indigo-600 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
                Profilim
              </button>
            </div>

            {/* Cüzdan Durumu (Basit) */}
            <div className="flex items-center">
               {isConnected ? (
                 <div className="hidden md:flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
                   <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                   <span className="text-emerald-400 text-xs font-mono">{publicKey.substring(0, 4)}...{publicKey.substring(publicKey.length-4)}</span>
                 </div>
               ) : (
                 <div className="px-3 py-1 bg-white/5 rounded-lg text-white/40 text-xs border border-white/5">
                   Misafir
                 </div>
               )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-slate-900/90 backdrop-blur-lg border-t border-white/10 z-50 p-2 flex justify-around">
          <button onClick={() => setActiveTab('polls')} className={`flex flex-col items-center p-2 ${activeTab === 'polls' ? 'text-indigo-400' : 'text-white/40'}`}>
            <Icons.Vote className="w-6 h-6" />
            <span className="text-[10px] mt-1">Anketler</span>
          </button>
          <button onClick={() => setActiveTab('create')} className={`flex flex-col items-center p-2 ${activeTab === 'create' ? 'text-indigo-400' : 'text-white/40'}`}>
            <Icons.Plus className="w-6 h-6" />
            <span className="text-[10px] mt-1">Oluştur</span>
          </button>
          <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center p-2 ${activeTab === 'profile' ? 'text-indigo-400' : 'text-white/40'}`}>
            <Icons.Award className="w-6 h-6" />
            <span className="text-[10px] mt-1">Profil</span>
          </button>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* --- TAB: OYLAMALAR --- */}
        {activeTab === 'polls' && (
          <div className="animate-in fade-in slide-in-from-left-4 duration-500">
            
            {/* Cüzdan Bağlantısı */}
            <div ref={walletSectionRef} className="mb-8 flex justify-center">
               {!isConnected ? (
                  <button onClick={handleConnect} className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition-all hover:scale-105">
                    <Icons.Wallet className="w-5 h-5" /> Cüzdanı Bağla
                  </button>
               ) : (
                  <div className="flex items-center gap-4">
                     <div className="text-white/60 text-sm">Hoşgeldin!</div>
                     <button onClick={handleDisconnect} className="text-red-400 text-sm hover:underline flex items-center gap-1">
                       <Icons.LogOut className="w-4 h-4" /> Çıkış
                     </button>
                  </div>
               )}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* SOL KOLON: OYLAMA LİSTESİ */}
              <div className="lg:col-span-2 space-y-6">
                 <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                   <Icons.Users className="w-6 h-6 text-indigo-400" />
                   Aktif Oylamalar
                 </h2>
                 
                 {polls.map((poll) => {
                    const hasVoted = votedPolls.includes(poll.id);
                    
                    return (
                    <div key={poll.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 transition-all hover:border-indigo-500/30 group">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-${poll.color}-500/20 text-${poll.color}-400`}>
                            {poll.community}
                          </span>
                          {poll.requiredToken && (
                            <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded text-amber-500 text-[10px] font-bold">
                              <Icons.Lock className="w-3 h-3" />
                              {poll.requiredToken} Only
                            </div>
                          )}
                        </div>
                        <div className="text-white/40 text-xs flex items-center gap-1">
                          <Icons.Users className="w-3 h-3" /> {poll.participants}
                        </div>
                      </div>

                      <h4 className="text-xl font-bold text-white mb-2">{poll.title}</h4>
                      <p className="text-white/60 text-sm mb-6">{poll.description}</p>
                      
                      {/* Seçenekler */}
                      <div className="space-y-3">
                        {poll.options.map((option, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <button
                              onClick={() => handleVoteClick(poll, option)}
                              disabled={hasVoted}
                              className={`flex-1 flex items-center justify-between p-3 rounded-xl transition-all text-left ${
                                hasVoted 
                                  ? 'bg-black/40 border-transparent text-white/30 cursor-not-allowed'
                                  : 'bg-black/20 hover:bg-indigo-600/20 border border-white/5 hover:border-indigo-500/50 group/btn text-white'
                              }`}
                            >
                              <span className="font-medium text-sm">{option.name}</span>
                              {!hasVoted && (
                                <span className="text-xs text-white/40 group-hover/btn:text-indigo-400 transition-colors">
                                  Seç →
                                </span>
                              )}
                              {hasVoted && <span className="text-xs">Kullanıldı</span>}
                            </button>
                            <button 
                              onClick={() => setQrAddress(option.address)}
                              className="p-3 rounded-xl bg-black/20 hover:bg-white/10 border border-white/5 text-white/40 hover:text-white transition-colors"
                              title="QR Kodu Göster"
                            >
                              <Icons.QrCode className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* GRAFİK - Sadece oy kullanıldıysa göster */}
                      {hasVoted ? (
                         <PollChart 
                           options={poll.options} 
                           totalVotes={poll.options.reduce((a, b) => a + b.votes, 0)} 
                         />
                      ) : (
                         <LockedResults />
                      )}

                      <CommentSection comments={poll.comments} />
                    </div>
                 )})}
              </div>

              {/* SAĞ KOLON: OY KABİNİ (Sabit) */}
              <div className="lg:col-span-1">
                 <div className="sticky top-24 space-y-6">
                    {/* Oy Kabini */}
                    <div ref={votingBoothRef} className={`bg-white/5 border border-white/10 rounded-2xl p-1 overflow-hidden backdrop-blur-sm transition-all duration-500 ${selectedVote ? 'ring-2 ring-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.2)]' : 'opacity-50 grayscale'}`}>
                        <div className="bg-white/5 p-4 border-b border-white/5">
                          <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            🗳️ Oy Kabini
                          </h3>
                          <p className="text-white/40 text-xs mt-1">
                            {isConnected 
                              ? (selectedVote ? 'Seçimin hazır. Gönder butonuna bas.' : 'Listeden bir aday seç.')
                              : 'Önce cüzdanını bağla.'}
                          </p>
                        </div>
                        <div className="p-6">
                          {selectedVote ? (
                            <div className="space-y-4">
                              <div className="bg-indigo-500/10 p-3 rounded-lg border border-indigo-500/20">
                                <label className="block text-indigo-300 text-xs mb-1">Hedef Cüzdan</label>
                                <div className="text-white font-mono text-xs break-all">{selectedVote.address}</div>
                              </div>
                              <div className="bg-indigo-500/10 p-3 rounded-lg border border-indigo-500/20">
                                <label className="block text-indigo-300 text-xs mb-1">Memo (Tercih)</label>
                                <div className="text-white font-mono text-sm">{selectedVote.memo}</div>
                              </div>
                              <button 
                                onClick={onPaymentSuccess}
                                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                              >
                                <Icons.CheckCircle className="w-5 h-5" /> Oyu Onayla (1 XLM)
                              </button>
                            </div>
                          ) : (
                            <div className="text-center py-8 text-white/20">
                              <Icons.ArrowRight className="w-12 h-12 mx-auto mb-2 opacity-20" />
                              <p>Aday Seçimi Bekleniyor...</p>
                            </div>
                          )}
                        </div>
                    </div>

                    {/* Bilgi Kartı */}
                    <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-xl p-4">
                      <h4 className="text-indigo-400 font-bold mb-2 flex items-center gap-2">
                        <Icons.Award className="w-4 h-4" />
                        Neden Oy Vermelisin?
                      </h4>
                      <p className="text-indigo-200/60 text-xs leading-relaxed">
                        Her oy, topluluğunun geleceğini şekillendirir. Ayrıca aktif katılımın sana 
                        <span className="text-white font-bold"> özel NFT rozetleri</span> kazandırır.
                      </p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB: OYLAMA OLUŞTUR --- */}
        {activeTab === 'create' && (
          <div className="max-w-2xl mx-auto mt-8">
            <CreatePollForm />
          </div>
        )}

        {/* --- TAB: PROFİLİM --- */}
        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
             {!isConnected ? (
               <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                 <h2 className="text-2xl font-bold text-white mb-4">Profilini Görmek İçin Bağlan</h2>
                 <button onClick={handleConnect} className="bg-indigo-600 text-white px-6 py-2 rounded-lg">Cüzdanı Bağla</button>
               </div>
             ) : (
               <div className="space-y-8">
                 {/* Profil Başlığı */}
                 <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-white/10 rounded-2xl p-8 flex items-center gap-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full flex items-center justify-center text-4xl shadow-xl">
                      🦄
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white">Anonim Üye</h2>
                      <p className="text-white/50 font-mono text-sm mt-1">{publicKey}</p>
                      <div className="flex gap-2 mt-4">
                        <span className="bg-white/10 px-3 py-1 rounded-full text-xs text-white/80 border border-white/5">Seviye 1</span>
                        <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs border border-emerald-500/20">Doğrulanmış Hesap</span>
                      </div>
                    </div>
                 </div>

                 {/* Rozet Koleksiyonu */}
                 <div>
                   <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                     <Icons.Award className="w-6 h-6 text-yellow-500" />
                     Rozet Koleksiyonum
                   </h3>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     {MOCK_BADGES.map((badge) => {
                       const isEarned = myBadges.includes(badge.id);
                       return (
                         <div key={badge.id} className={`p-4 rounded-xl border transition-all ${isEarned ? 'bg-white/10 border-yellow-500/50 shadow-lg shadow-yellow-500/10' : 'bg-black/20 border-white/5 opacity-50 grayscale'}`}>
                           <div className="text-4xl mb-3 text-center">{badge.icon}</div>
                           <h4 className={`text-center font-bold mb-1 ${isEarned ? 'text-white' : 'text-white/40'}`}>{badge.name}</h4>
                           <p className="text-center text-[10px] text-white/40">{badge.desc}</p>
                           {!isEarned && <div className="mt-2 text-center text-[10px] uppercase tracking-wide text-white/20 font-bold">Kilitli</div>}
                         </div>
                       )
                     })}
                   </div>
                 </div>
               </div>
             )}
          </div>
        )}

      </main>
    </div>
  );
}