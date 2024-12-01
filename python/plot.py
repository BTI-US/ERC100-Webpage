import matplotlib.pyplot as plt
import numpy as np


def main():
    n_days = 10000
    # 模拟一个上升的股票曲线
    rising_prices, top_prices, stop_prices = simulate_rising_stock_prices(n_days)
    # 模拟一个随机波动的股票曲线，初始值提高，波动更大
    fluctuating_prices = simulate_fluctuating_stock_prices(n_days, initial_price=20)
    
    # 绘制上升和波动的股票价格曲线
    draw_stock_prices(rising_prices, fluctuating_prices)


def simulate_rising_stock_prices(n_days, initial_price=1, volatility=0.01, trend=0.0002):
    """
    模拟一个上升的股市价格序列，价格随着时间有上升趋势，同时加入一定波动。
    
    参数：
    - n_days: 模拟的天数
    - initial_price: 初始股价
    - volatility: 每天的波动幅度
    - trend: 每天的价格上升趋势
    
    返回值：
    - stock_prices: 上升趋势的股市价格序列
    - top_prices: 股价历史最高值序列
    - stop_prices: 跌停值序列
    """
    stock_prices = [initial_price]
    top_prices = [initial_price]
    stop_prices = [initial_price * 0.8]
    
    for _ in range(1, n_days):
        # 模拟涨跌幅（正态分布，均值为trend，标准差为volatility）
        daily_return = np.random.normal(trend, volatility)
        new_price = stock_prices[-1] * (1 + daily_return)
        
        if new_price > stop_prices[-1]:
            stock_prices.append(new_price)
        else:
            stock_prices.append(stock_prices[-1])
        
        if new_price > top_prices[-1]:
            top_prices.append(new_price)
            stop_prices.append(new_price * 0.8)
        else:
            top_prices.append(top_prices[-1])
            stop_prices.append(stop_prices[-1])
    
    return stock_prices, top_prices, stop_prices


def simulate_fluctuating_stock_prices(n_days, initial_price=20, volatility=0.03):
    """
    模拟一个随意波动的股市价格序列，没有明确的上升趋势。
    
    参数：
    - n_days: 模拟的天数
    - initial_price: 初始股价
    - volatility: 每天的波动幅度
    
    返回值：
    - stock_prices: 随意波动的股市价格序列
    """
    stock_prices = [initial_price]
    
    for _ in range(1, n_days):
        # 模拟涨跌幅（正态分布，均值为0，标准差为volatility）
        daily_return = np.random.normal(0, volatility)
        new_price = stock_prices[-1] * (1 + daily_return)
        stock_prices.append(new_price)
    
    return stock_prices


def draw_stock_prices(rising_prices, fluctuating_prices):
    x = np.linspace(0, len(rising_prices) - 1, len(rising_prices))
    
    # 绘制上升曲线和波动曲线
    plt.figure(figsize=(13, 10), dpi=200)
    plt.plot(x, rising_prices, color='royalblue', label='Rising Prices')
    plt.plot(x, fluctuating_prices, color='orange', label='Fluctuating Prices')
    
    plt.title(f'Stock Prices: Rising vs Fluctuating')
    plt.xlabel('Days')
    plt.ylabel('Price')
    plt.grid(True)
    plt.legend()
    plt.show()


if __name__ == '__main__':
    main()
