import React, { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { Page, Sale, User, Product } from './types';

// =================================================================================
// Icon Components
// =================================================================================
interface IconProps {
  className?: string;
}

const HomeIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const UsersIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a4 4 0 110-5.292" />
  </svg>
);

const FolderIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

const CogIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const DollarSignIcon: React.FC<IconProps> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8v1m0 6v1m0-10a9 9 0 110 18 9 9 0 010-18z" />
    </svg>
);

const ChartBarIcon: React.FC<IconProps> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

const UserGroupIcon: React.FC<IconProps> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const PresentationChartLineIcon: React.FC<IconProps> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
    </svg>
);

const TrendingUpIcon: React.FC<IconProps> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);

const ArrowUturnLeftIcon: React.FC<IconProps> = ({ className = 'w-8 h-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
    </svg>
);

const ShieldCheckIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a12.02 12.02 0 009 3.04a12.02 12.02 0 009-3.04 12.02 12.02 0 00-2.382-8.984z" />
    </svg>
);

const BellIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);

const KeyIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
    </svg>
);

const SearchIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const PlusIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const PencilIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
  </svg>
);

const TrashIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const ClipboardIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

// =================================================================================
// Mock Data
// =================================================================================

const salesData = [
  { name: 'Янв', sales: 4000 }, { name: 'Фев', sales: 3000 }, { name: 'Мар', sales: 5000 },
  { name: 'Апр', sales: 4500 }, { name: 'Май', sales: 6000 }, { name: 'Июн', sales: 5500 },
  { name: 'Июл', sales: 7000 },
];

const bounceRateData = [
    { name: 'Янв', rate: 45 }, { name: 'Фев', rate: 42 }, { name: 'Мар', rate: 50 },
    { name: 'Апр', rate: 38 }, { name: 'Май', rate: 35 }, { name: 'Июн', rate: 32 },
    { name: 'Июл', rate: 30 },
];

const recentSales: Sale[] = [
    { id: '1', user: { name: 'Алиса', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }, productName: 'Смарт-часы', amount: 12500, date: '2024-07-21', status: 'Completed' },
    { id: '2', user: { name: 'Борис', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d' }, productName: 'Наушники', amount: 4990, date: '2024-07-21', status: 'Pending' },
    { id: '3', user: { name: 'Виктория', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d' }, productName: 'Клавиатура', amount: 7800, date: '2024-07-20', status: 'Completed' },
    { id: '4', user: { name: 'Григорий', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d' }, productName: 'Веб-камера', amount: 3500, date: '2024-07-20', status: 'Cancelled' },
    { id: '5', user: { name: 'Диана', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d' }, productName: 'Монитор', amount: 25000, date: '2024-07-19', status: 'Completed' },
];

const purchaseSourcesData = [
  { name: 'Интернет-магазин', value: 400 },
  { name: 'Офлайн продажи', value: 300 },
  { name: 'Телефонные заказы', value: 200 },
];

const users: User[] = Array.from({ length: 25 }, (_, i) => ({
    id: `user-${i + 1}`,
    name: ['Иван Петров', 'Мария Сидорова', 'Алексей Иванов', 'Елена Кузнецова', 'Дмитрий Смирнов', 'Ольга Васильева', 'Сергей Михайлов', 'Анастасия Павлова', 'Николай Орлов', 'Татьяна Фёдорова'][i % 10],
    email: `user${i + 1}@example.com`,
    avatar: `https://i.pravatar.cc/150?u=user${i + 1}`,
    registrationDate: `2024-0${(i % 6) + 1}-15`,
    totalSpent: Math.floor(Math.random() * 50000) + 1000,
    lastOrderDate: `2024-07-${Math.floor(Math.random() * 20) + 1}`,
    status: (['Active', 'Inactive', 'Banned'] as const)[i % 3],
}));


const products: Product[] = Array.from({ length: 20 }, (_, i) => ({
    id: `prod-${i + 1}`,
    name: [
        'Игровая мышь G502', 'Механическая клавиатура K70', 'Монитор UltraSharp 27"',
        'Веб-камера C920', 'Наушники WH-1000XM5', 'Смарт-часы Watch GT 4',
        'Ноутбук MacBook Air M3', 'Планшет iPad Pro 11"', 'Смартфон Galaxy S24',
        'Кофемашина DeLonghi', 'Робот-пылесос Roborock S8', 'Экшн-камера GoPro HERO12',
        'Фитнес-браслет Mi Band 8', 'Портативная колонка JBL Flip 6', 'SSD-накопитель Samsung 980 Pro',
        'Видеокарта GeForce RTX 4070', 'Процессор Core i7-14700K', 'Материнская плата ROG STRIX Z790',
        'Оперативная память Corsair Vengeance 32GB', 'Блок питания Cooler Master 850W'
    ][i],
    sku: `SKU-${Math.floor(Math.random() * 90000) + 10000}`,
    category: ['Электроника', 'Компьютеры', 'Бытовая техника', 'Аксессуары'][i % 4],
    price: Math.floor(Math.random() * 1500) * 100 + 500,
    stock: Math.floor(Math.random() * 201),
    status: (['Published', 'Draft', 'Archived'] as const)[i % 3],
    dateAdded: `2024-0${(i % 6) + 1}-${Math.floor(Math.random() * 28) + 1}`,
    imageUrl: `https://picsum.photos/seed/product${i}/200/200`,
}));

// =================================================================================
// Page Components
// =================================================================================

const Dashboard: React.FC = () => {
    const MetricCard = ({ icon, title, value, change }: { icon: React.ReactNode; title: string; value: string; change: string; }) => (
        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-700/50 transition-all duration-300 hover:bg-slate-800/80 hover:shadow-2xl hover:-translate-y-1">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="bg-slate-700/50 p-3 rounded-lg">{icon}</div>
                    <div>
                        <p className="text-slate-400 text-sm">{title}</p>
                        <p className="text-2xl font-bold">{value}</p>
                    </div>
                </div>
                <span className={`text-sm font-semibold ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{change}</span>
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard icon={<DollarSignIcon />} title="Общий доход" value="₽768,5K" change="+12.5%" />
                <MetricCard icon={<ChartBarIcon />} title="Продажи" value="9,210" change="+8.1%" />
                <MetricCard icon={<UserGroupIcon />} title="Новые клиенты" value="1,024" change="-2.3%" />
                <MetricCard icon={<TrendingUpIcon />} title="Конверсии" value="2.54%" change="+5.2%" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-700/50">
                    <h3 className="text-lg font-semibold mb-4">Динамика продаж</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                            <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} />
                            <YAxis tick={{ fill: '#94a3b8' }} />
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#e2e8f0' }} />
                            <Legend />
                            <Line type="monotone" dataKey="sales" name="Продажи" stroke="#38bdf8" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                 <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-700/50">
                    <h3 className="text-lg font-semibold mb-4">Динамика процента отказа</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={bounceRateData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                            <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} />
                            <YAxis tick={{ fill: '#94a3b8' }} unit="%" />
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#e2e8f0' }} formatter={(value) => `${value}%`} />
                            <Legend />
                            <Line type="monotone" dataKey="rate" name="Процент отказа" stroke="#f472b6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-700/50">
                    <h3 className="text-lg font-semibold mb-4">Последние продажи</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-slate-700">
                                <tr>
                                    <th className="p-3">Пользователь</th>
                                    <th className="p-3">Товар</th>
                                    <th className="p-3">Сумма</th>
                                    <th className="p-3">Статус</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentSales.map(sale => (
                                    <tr key={sale.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors duration-150">
                                        <td className="p-3 flex items-center">
                                            <img src={sale.user.avatar} alt={sale.user.name} className="w-8 h-8 rounded-full mr-3" />
                                            <span>{sale.user.name}</span>
                                        </td>
                                        <td className="p-3">{sale.productName}</td>
                                        <td className="p-3">₽{sale.amount.toLocaleString()}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                sale.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                                                sale.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-red-500/20 text-red-400'
                                            }`}>
                                                {sale.status === 'Completed' ? 'Завершен' : sale.status === 'Pending' ? 'В ожидании' : 'Отменен'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                 <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-700/50">
                    <h3 className="text-lg font-semibold mb-4">Источники покупок</h3>
                     <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <defs>
                                <linearGradient id="colorPurple" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                                    <stop offset="100%" stopColor="#c084fc" stopOpacity={0.9}/>
                                </linearGradient>
                                <linearGradient id="colorBlue" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.8}/>
                                    <stop offset="100%" stopColor="#7dd3fc" stopOpacity={0.9}/>
                                </linearGradient>
                                <linearGradient id="colorGreen" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.8}/>
                                    <stop offset="100%" stopColor="#86efac" stopOpacity={0.9}/>
                                </linearGradient>
                            </defs>
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#e2e8f0' }} />
                            <Legend />
                            <Pie data={purchaseSourcesData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={60} paddingAngle={5}>
                                <Cell fill="url(#colorPurple)" stroke="none" />
                                <Cell fill="url(#colorBlue)" stroke="none" />
                                <Cell fill="url(#colorGreen)" stroke="none" />
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};


const Customers: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const itemsPerPage = 8;

    const filteredUsers = useMemo(() => {
        return users
            .filter(user => statusFilter === 'All' || user.status === statusFilter)
            .filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [searchTerm, statusFilter]);

    const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    
    return (
        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-700/50">
            <h2 className="text-2xl font-bold mb-6">Покупатели</h2>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                <div className="relative w-full sm:w-auto">
                    <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Поиск по имени или email..." 
                        className="bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 w-full sm:w-64 focus:ring-2 focus:ring-sky-500 focus:outline-none transition"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-4">
                    <select 
                        className="bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none transition"
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                    >
                        <option value="All">Все статусы</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Banned">Banned</option>
                    </select>
                     <button className="flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-sky-500 transition-all duration-200 transform hover:scale-105">
                        <PlusIcon />
                        Добавить
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-slate-700 text-sm text-slate-400">
                        <tr>
                            <th className="p-3">Имя</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Всего потрачено</th>
                            <th className="p-3">Статус</th>
                            <th className="p-3">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedUsers.map(user => (
                            <tr key={user.id} className="border-b border-slate-700 hover:bg-slate-800/50 transition-colors duration-150">
                                <td className="p-3 flex items-center">
                                    <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full mr-4" />
                                    <div>
                                        <p className="font-semibold">{user.name}</p>
                                        <p className="text-sm text-slate-400">ID: {user.id}</p>
                                    </div>
                                </td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3">₽{user.totalSpent.toLocaleString()}</td>
                                <td className="p-3">
                                     <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        user.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                                        user.status === 'Inactive' ? 'bg-yellow-500/20 text-yellow-400' :
                                        'bg-red-500/20 text-red-400'
                                    }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <div className="flex gap-2">
                                        <button className="p-2 text-slate-400 hover:text-sky-400 transition-colors duration-200"><PencilIcon /></button>
                                        <button className="p-2 text-slate-400 hover:text-red-400 transition-colors duration-200"><TrashIcon /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-6">
                <nav className="flex gap-2">
                    {Array.from({ length: pageCount }, (_, i) => i + 1).map(pageNumber => (
                        <button key={pageNumber} onClick={() => setCurrentPage(pageNumber)} className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 hover:scale-110 ${currentPage === pageNumber ? 'bg-sky-600 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}>
                            {pageNumber}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
};

const Catalog: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const itemsPerPage = 8;

    const filteredProducts = useMemo(() => {
        return products
            .filter(product => categoryFilter === 'All' || product.category === categoryFilter)
            .filter(product => statusFilter === 'All' || product.status === statusFilter)
            .filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.sku.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [searchTerm, categoryFilter, statusFilter]);
    
    const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const getStockIndicatorColor = (stock: number) => {
        if (stock > 50) return 'bg-green-500';
        if (stock > 10) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-700/50">
            <h2 className="text-2xl font-bold mb-6">Каталог товаров</h2>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                <div className="relative w-full sm:w-auto">
                    <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Поиск по названию или SKU..."
                        className="bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 w-full sm:w-64 focus:ring-2 focus:ring-sky-500 focus:outline-none transition"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-4">
                    <select
                        className="bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none transition"
                        value={categoryFilter}
                        onChange={e => setCategoryFilter(e.target.value)}
                    >
                        <option value="All">Все категории</option>
                        {[...new Set(products.map(p => p.category))].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <select
                        className="bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none transition"
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                    >
                        <option value="All">Все статусы</option>
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                        <option value="Archived">Archived</option>
                    </select>
                    <button className="flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-sky-500 transition-all duration-200 transform hover:scale-105">
                        <PlusIcon />
                        Добавить
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                     <thead className="border-b border-slate-700 text-sm text-slate-400">
                        <tr>
                            <th className="p-3">Товар</th>
                            <th className="p-3">SKU</th>
                            <th className="p-3">Категория</th>
                            <th className="p-3">Цена</th>
                            <th className="p-3">Остаток</th>
                            <th className="p-3">Статус</th>
                            <th className="p-3">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedProducts.map((product) => (
                            <tr key={product.id} className="border-b border-slate-700 hover:bg-slate-800/50 transition-colors duration-150">
                                <td className="p-3 flex items-center">
                                    <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded-md mr-4 object-cover" />
                                    <span className="font-semibold">{product.name}</span>
                                </td>
                                <td className="p-3 text-slate-400">{product.sku}</td>
                                <td className="p-3">{product.category}</td>
                                <td className="p-3">₽{product.price.toLocaleString()}</td>
                                <td className="p-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-20 bg-slate-700 rounded-full h-2.5">
                                            <div className={`${getStockIndicatorColor(product.stock)} h-2.5 rounded-full`} style={{ width: `${product.stock / 200 * 100}%` }}></div>
                                        </div>
                                        <span className="text-sm">{product.stock} шт.</span>
                                    </div>
                                </td>
                                <td className="p-3">
                                     <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        product.status === 'Published' ? 'bg-green-500/20 text-green-400' :
                                        product.status === 'Draft' ? 'bg-yellow-500/20 text-yellow-400' :
                                        'bg-purple-500/20 text-purple-400'
                                    }`}>
                                        {product.status}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <div className="flex gap-2">
                                        <button className="p-2 text-slate-400 hover:text-sky-400 transition-colors duration-200"><PencilIcon /></button>
                                        <button className="p-2 text-slate-400 hover:text-red-400 transition-colors duration-200"><TrashIcon /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-6">
                <nav className="flex gap-2">
                    {Array.from({ length: pageCount }, (_, i) => i + 1).map(pageNumber => (
                        <button key={pageNumber} onClick={() => setCurrentPage(pageNumber)} className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 hover:scale-110 ${currentPage === pageNumber ? 'bg-sky-600 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}>
                            {pageNumber}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
};

const Settings: React.FC = () => {
    
    const SettingSection = ({ title, icon, children }: {title: string, icon: React.ReactNode, children: React.ReactNode}) => (
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-3">
                {icon}
                {title}
            </h3>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );

    const InputField = ({ label, type, id, value, placeholder }: {label:string, type:string, id:string, value?: string, placeholder?:string}) => (
         <div>
            <label htmlFor={id} className="block text-sm font-medium text-slate-400 mb-2">{label}</label>
            <input type={type} id={id} defaultValue={value} placeholder={placeholder} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none transition" />
        </div>
    );

     const Toggle = ({ label, id, enabled }: {label:string, id:string, enabled?:boolean}) => (
        <div className="flex items-center justify-between">
            <label htmlFor={id} className="text-slate-300">{label}</label>
            <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
                <input type="checkbox" name={id} id={id} defaultChecked={enabled} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-sky-500"/>
                <label htmlFor={id} className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-700 cursor-pointer"></label>
            </div>
        </div>
     );

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center">Настройки</h2>
            
            <SettingSection title="Общие настройки" icon={<CogIcon className="w-6 h-6 text-sky-400" />}>
                <InputField label="Название магазина" type="text" id="store-name" value="Мой Магазин" />
                <InputField label="Контактный Email" type="email" id="contact-email" value="admin@example.com" />
                 <div>
                    <label htmlFor="currency" className="block text-sm font-medium text-slate-400 mb-2">Валюта</label>
                    <select id="currency" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none transition">
                        <option>RUB (₽)</option>
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                    </select>
                </div>
            </SettingSection>

            <SettingSection title="Безопасность" icon={<ShieldCheckIcon className="w-6 h-6 text-green-400" />}>
                <InputField label="Текущий пароль" type="password" id="current-password" placeholder="••••••••" />
                <InputField label="Новый пароль" type="password" id="new-password" placeholder="••••••••" />
                <InputField label="Подтвердите новый пароль" type="password"id="confirm-password" placeholder="••••••••" />
                <Toggle label="Двухфакторная аутентификация (2FA)" id="2fa-toggle" enabled />
            </SettingSection>

            <SettingSection title="Уведомления" icon={<BellIcon className="w-6 h-6 text-yellow-400" />}>
                <Toggle label="Email о новых продажах" id="sale-notify" enabled />
                <Toggle label="Email о низком остатке на складе" id="stock-notify" enabled />
                <Toggle label="Email о регистрации нового пользователя" id="user-notify" />
            </SettingSection>

            <SettingSection title="API" icon={<KeyIcon className="w-6 h-6 text-purple-400" />}>
                <p className="text-sm text-slate-400">Используйте этот ключ для интеграции со сторонними сервисами.</p>
                <div className="flex items-center gap-2">
                    <input type="text" readOnly value="****************************_abc123" className="w-full bg-slate-900 font-mono text-sm border border-slate-700 rounded-lg px-4 py-2" />
                    <button className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors duration-200" title="Копировать">
                        <ClipboardIcon />
                    </button>
                </div>
                 <button className="text-sky-400 font-semibold hover:text-sky-300 transition-colors duration-200">Сгенерировать новый ключ</button>
            </SettingSection>

            <div className="flex justify-end pt-4">
                 <button className="bg-sky-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-500 transition-all duration-200 transform hover:scale-105 shadow-lg">
                    Сохранить изменения
                </button>
            </div>
             <style>{`
                .toggle-checkbox:checked {
                    right: 0;
                    border-color: #0ea5e9;
                }
                .toggle-checkbox:checked + .toggle-label {
                    background-color: #0ea5e9;
                }
            `}</style>
        </div>
    );
};

// =================================================================================
// Main App Component
// =================================================================================

const App: React.FC = () => {
    const [page, setPage] = useState<Page>('dashboard');
    
    const pageTitles: { [key in Page]: string } = {
        dashboard: 'Главная',
        customers: 'Покупатели',
        catalog: 'Каталог',
        settings: 'Настройки'
    };

    const NavItem = ({ icon, label, pageName, currentPage, setPage }: { icon: React.ReactNode, label: string, pageName: Page, currentPage: Page, setPage: (page: Page) => void }) => {
        const isActive = currentPage === pageName;
        const baseClasses = 'flex items-center px-4 py-3 rounded-lg transition-all duration-300 ease-in-out';
        const activeClasses = 'shadow-lg bg-gradient-to-r from-sky-600/50 to-cyan-500/50 text-white font-semibold';
        const inactiveClasses = 'text-slate-400 hover:bg-slate-700/50 hover:text-white hover:translate-x-1';

        return (
            <li>
                <a href="#" onClick={(e) => { e.preventDefault(); setPage(pageName); }} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
                    {icon}
                    <span className="ml-4">{label}</span>
                </a>
            </li>
        );
    };

    const Sidebar: React.FC<{ currentPage: Page, setPage: (page: Page) => void }> = ({ currentPage, setPage }) => (
        <aside className="w-64 bg-slate-900/70 backdrop-blur-xl flex flex-col flex-shrink-0 border-r border-slate-800">
            <div className="h-20 flex items-center justify-center border-b border-slate-800">
                <h1 className="text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300">CRM 1.0</h1>
            </div>
            <nav className="flex-1 px-4 py-6">
                <ul className="space-y-3">
                    <NavItem icon={<HomeIcon />} label="Главная" pageName="dashboard" currentPage={currentPage} setPage={setPage} />
                    <NavItem icon={<UsersIcon />} label="Покупатели" pageName="customers" currentPage={currentPage} setPage={setPage} />
                    <NavItem icon={<FolderIcon />} label="Каталог" pageName="catalog" currentPage={currentPage} setPage={setPage} />
                    <NavItem icon={<CogIcon />} label="Настройки" pageName="settings" currentPage={currentPage} setPage={setPage} />
                </ul>
            </nav>
            <div className="p-4 border-t border-slate-800">
                 <a 
                    href="https://thatalexpavlov.ru" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block p-4 rounded-lg bg-gradient-to-r from-sky-600/50 to-cyan-500/50 text-center text-white font-semibold transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-sky-500/20 hover:scale-105"
                >
                    Хочешь такую же админку?
                </a>
            </div>
        </aside>
    );

    const Header: React.FC<{ title: string }> = ({ title }) => (
        <header className="bg-slate-900/50 backdrop-blur-lg sticky top-0 z-10 h-20 flex items-center justify-between px-8 border-b border-slate-800">
            <h2 className="text-2xl font-bold text-slate-100">{title}</h2>
            <div className="flex items-center space-x-4">
                <div className="text-right">
                    <p className="font-semibold">Александр Павлов</p>
                    <p className="text-sm text-slate-400">Администратор</p>
                </div>
                <div className="relative">
                    <img className="w-12 h-12 rounded-full object-cover border-2 border-transparent p-0.5 bg-clip-border bg-gradient-to-r from-green-400 to-cyan-400" src="https://i.pravatar.cc/150?u=alex-pavlov-admin" alt="Admin Avatar"/>
                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-slate-900"></span>
                </div>
            </div>
        </header>
    );
    
    const Footer: React.FC = () => (
        <footer className="py-4 px-8 text-center text-sm text-slate-400 border-t border-slate-800 bg-slate-900/50 backdrop-blur-lg">
            <div className="flex items-center justify-center gap-2">
                <span>система управления продажами 2025. разработано</span>
                <a href="https://thatalexpavlov.ru" target="_blank" rel="noopener noreferrer" className="transition-transform duration-200 hover:scale-110">
                    <img src="https://thatalexpavlov.ru/static/media/logo-tap.3567dd600aac13a0e5b5.webp" alt="Developer Logo" className="h-6" />
                </a>
            </div>
        </footer>
    );

    return (
        <div className="min-h-screen bg-mountain-bg bg-cover bg-center bg-fixed">
            <div className="flex h-screen bg-brand-start/80 backdrop-blur-sm">
                <Sidebar currentPage={page} setPage={setPage} />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Header title={pageTitles[page]} />
                    <main className="flex-1 overflow-y-auto p-8">
                        <div key={page} className="animate-fade-in">
                            {page === 'dashboard' && <Dashboard />}
                            {page === 'customers' && <Customers />}
                            {page === 'catalog' && <Catalog />}
                            {page === 'settings' && <Settings />}
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default App;