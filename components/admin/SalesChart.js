export default function SalesChart({ data }) {
  const maxSales = Math.max(...data.map(item => item.sales));

  return (
    <div className="sales-chart">
      <div className="chart-header">
        <h3>Sales Overview</h3>
        <p>Monthly sales performance</p>
      </div>
      
      <div className="chart-container">
        <div className="chart-bars">
          {data.map((item, index) => (
            <div key={index} className="chart-bar-container">
              <div 
                className="chart-bar"
                style={{ height: `${(item.sales / maxSales) * 100}%` }}
              >
                <div className="bar-tooltip">
                  ${item.sales.toLocaleString()}
                </div>
              </div>
              <span className="bar-label">{item.month}</span>
            </div>
          ))}
        </div>
        
        <div className="chart-summary">
          <div className="summary-item">
            <span className="summary-label">Total Sales</span>
            <span className="summary-value">
              ${data.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Average</span>
            <span className="summary-value">
              ${Math.round(data.reduce((sum, item) => sum + item.sales, 0) / data.length).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
