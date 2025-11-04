// ==================== 用户相关类型 ====================

export enum UserRole {
  USER = 'USER',
  VIP = 'VIP',
  REFERRER = 'REFERRER',
  ADMIN = 'ADMIN',
}

export enum KYCLevel {
  NONE = 'NONE',
  LEVEL_1 = 'LEVEL_1',
  LEVEL_2 = 'LEVEL_2',
  LEVEL_3 = 'LEVEL_3',
}

export enum KYCStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  INCOMPLETE = 'INCOMPLETE',
}

export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  FROZEN = 'FROZEN',
  BANNED = 'BANNED',
}

export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  phone?: string
  role: UserRole
  kycLevel: KYCLevel
  accountStatus: AccountStatus
  referralCode: string
  referredBy?: string
  createdAt: Date
  lastLoginAt?: Date
}

export interface KYCApplication {
  id: string
  userId: string
  level: KYCLevel
  status: KYCStatus
  realName?: string
  idNumber?: string
  birthDate?: Date
  address?: string
  idFrontImage?: string
  idBackImage?: string
  selfieImage?: string
  addressProof?: string
  rejectionReason?: string
  submittedAt: Date
  reviewedAt?: Date
  reviewedBy?: string
}

// ==================== 资产相关类型 ====================

export enum AssetType {
  STOCK_RWA = 'STOCK_RWA',
  VIRTUAL_RWA = 'VIRTUAL_RWA',
  PROPERTY_RWA = 'PROPERTY_RWA',
}

export enum AssetStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  DELISTED = 'DELISTED',
}

export interface Asset {
  id: string
  code: string // 资产代码，如 AAPL-RWA
  name: string
  type: AssetType
  icon?: string
  description?: string
  price: number // 当前价格
  priceChange24h: number // 24h涨跌幅 (%)
  volume24h: number // 24h成交量
  marketCap: number // 市值
  minTradeAmount: number // 最小交易数量
  pricePrecision: number // 价格精度
  amountPrecision: number // 数量精度
  feeRate: number // 手续费率
  issuer?: string // 发行方
  custodian?: string // 托管方
  underlyingAsset?: string // 底层资产
  riskLevel?: number // 风险等级 1-5
  contractAddress?: string // 合约地址
  totalSupply?: number // 总发行量
  status: AssetStatus
  isFeatured: boolean // 是否推荐
  isNew: boolean // 是否新资产
  isHot: boolean // 是否热门
  listedAt: Date
  createdAt: Date
}

// ==================== 交易相关类型 ====================

export enum OrderType {
  LIMIT = 'LIMIT', // 限价单
  MARKET = 'MARKET', // 市价单
  STOP_LOSS = 'STOP_LOSS', // 止损单
  TAKE_PROFIT = 'TAKE_PROFIT', // 止盈单
}

export enum OrderSide {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum OrderStatus {
  PENDING = 'PENDING', // 等待成交
  PARTIAL = 'PARTIAL', // 部分成交
  FILLED = 'FILLED', // 完全成交
  CANCELLED = 'CANCELLED', // 已取消
  REJECTED = 'REJECTED', // 已拒绝
}

export interface Order {
  id: string
  userId: string
  assetId: string
  assetCode: string
  assetName: string
  type: OrderType
  side: OrderSide
  price: number // 委托价格
  amount: number // 委托数量
  filledAmount: number // 成交数量
  totalValue: number // 总价值
  fee: number // 手续费
  status: OrderStatus
  stopPrice?: number // 触发价格（止损/止盈）
  createdAt: Date
  updatedAt: Date
  filledAt?: Date
}

export interface Trade {
  id: string
  orderId: string
  buyerId: string
  sellerId: string
  assetId: string
  assetCode: string
  price: number
  amount: number
  totalValue: number
  buyerFee: number
  sellerFee: number
  timestamp: Date
}

// ==================== 钱包相关类型 ====================

export enum Currency {
  CNY = 'CNY',
  USDT = 'USDT',
  USDC = 'USDC',
}

export enum TransactionType {
  DEPOSIT = 'DEPOSIT', // 充值
  WITHDRAW = 'WITHDRAW', // 提现
  TRADE_BUY = 'TRADE_BUY', // 买入
  TRADE_SELL = 'TRADE_SELL', // 卖出
  FEE = 'FEE', // 手续费
  REFERRAL_REWARD = 'REFERRAL_REWARD', // 推荐奖励
  COMMISSION = 'COMMISSION', // 返佣
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export interface Wallet {
  id: string
  userId: string
  currency: Currency
  balance: number // 可用余额
  frozen: number // 冻结金额
  total: number // 总额
  updatedAt: Date
}

export interface DepositRecord {
  id: string
  userId: string
  currency: Currency
  amount: number
  address: string
  network?: string
  txHash?: string
  confirmations: number
  requiredConfirmations: number
  status: TransactionStatus
  createdAt: Date
  completedAt?: Date
}

export interface WithdrawRecord {
  id: string
  userId: string
  currency: Currency
  amount: number
  address: string
  network?: string
  fee: number
  txHash?: string
  status: TransactionStatus
  rejectionReason?: string
  riskScore?: number // 风险评分
  createdAt: Date
  reviewedAt?: Date
  completedAt?: Date
}

export interface Transaction {
  id: string
  userId: string
  type: TransactionType
  currency: Currency
  amount: number
  balance: number // 操作后余额
  relatedId?: string // 关联ID（订单ID、充提ID等）
  note?: string
  createdAt: Date
}

// ==================== 持仓相关类型 ====================

export interface Position {
  id: string
  userId: string
  assetId: string
  assetCode: string
  assetName: string
  amount: number // 持仓数量
  available: number // 可用数量
  frozen: number // 冻结数量
  avgCost: number // 平均成本
  currentPrice: number // 当前价格
  marketValue: number // 市值
  profitLoss: number // 盈亏
  profitLossPercent: number // 盈亏百分比
  updatedAt: Date
}

// ==================== 推荐相关类型 ====================

export interface ReferralStats {
  userId: string
  referralCode: string
  totalReferrals: number // 总邀请人数
  activeReferrals: number // 活跃邀请人数
  totalRewards: number // 总奖励
  totalCommission: number // 总返佣
}

export interface ReferralRecord {
  id: string
  referrerId: string
  refereeId: string
  refereeEmail: string
  reward: number
  status: 'PENDING' | 'COMPLETED'
  createdAt: Date
  completedAt?: Date
}

// ==================== K线数据类型 ====================

export interface Kline {
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export type KlineInterval = '1m' | '5m' | '15m' | '30m' | '1h' | '4h' | '1d' | '1w'

// ==================== 市场深度类型 ====================

export interface OrderBookItem {
  price: number
  amount: number
  total: number
}

export interface OrderBook {
  assetCode: string
  bids: OrderBookItem[] // 买单
  asks: OrderBookItem[] // 卖单
  timestamp: Date
}

// ==================== 管理员相关类型 ====================

export enum AdminRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  OPERATION = 'OPERATION',
  FINANCE = 'FINANCE',
  CUSTOMER_SERVICE = 'CUSTOMER_SERVICE',
}

export interface Admin {
  id: string
  username: string
  email: string
  role: AdminRole
  status: AccountStatus
  createdAt: Date
  lastLoginAt?: Date
}

export interface AdminLog {
  id: string
  adminId: string
  adminUsername: string
  action: string
  details?: string
  ip: string
  createdAt: Date
}

// ==================== 公告类型 ====================

export enum AnnouncementType {
  SYSTEM = 'SYSTEM',
  NEW_ASSET = 'NEW_ASSET',
  MAINTENANCE = 'MAINTENANCE',
  ACTIVITY = 'ACTIVITY',
}

export interface Announcement {
  id: string
  title: string
  content: string
  type: AnnouncementType
  isPinned: boolean
  isPopup: boolean
  publishedAt?: Date
  createdAt: Date
}

// ==================== 统计数据类型 ====================

export interface PlatformStats {
  totalUsers: number
  totalAssets: number
  totalTrades: number
  totalVolume24h: number
  totalFeeIncome: number
}

export interface UserStats {
  totalAssets: number
  totalProfit: number
  totalProfitPercent: number
  winRate: number
  totalTrades: number
}

// ==================== API响应类型 ====================

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// ==================== 开放API相关类型 ====================

export enum PartnerStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  INACTIVE = 'INACTIVE',
}

export interface Partner {
  id: string
  name: string
  apiKey: string
  apiSecret: string
  status: PartnerStatus
  permissions: string[]
  callLimit: number // 调用限额（次/天）
  createdAt: Date
}

export interface ApiCallLog {
  id: string
  partnerId: string
  endpoint: string
  method: string
  statusCode: number
  responseTime: number // 响应时间（ms）
  ip: string
  timestamp: Date
}
