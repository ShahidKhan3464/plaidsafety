import React from 'react';
import { Icons } from 'assets';
import { Skeleton } from '@mui/material';
import { StyledChartCards } from './style';
import { customColors } from 'theme/pallete';
import ReactECharts from 'echarts-for-react';

const easingFuncs = {
  bounceInOut: function (k) {
    if (k < 0.5) {
      return 0.5 * (1 - Math.sqrt(1 - 4 * k * k));
    }
    return 0.5 * (Math.sqrt(1 - (2 - 2 * k) * (2 - 2 * k)) + 1);
  }
};

const N_POINT = 50;
const grids = [
  {
    top: '5%',
    show: true,
    left: '5%',
    width: '90%',
    height: '90%',
    shadowBlur: 2,
    borderWidth: 0,
    shadowColor: 'rgba(0, 0, 0, 0.3)'
  }
];
const xAxes = [
  {
    min: 0,
    max: 1,
    show: false,
    gridIndex: 0,
    type: 'value'
  }
];
const yAxes = [
  {
    max: 1.4,
    min: -0.4,
    show: false,
    gridIndex: 0,
    type: 'value'
  }
];
const series = [
  {
    type: 'line',
    xAxisIndex: 0,
    yAxisIndex: 0,
    showSymbol: false,
    name: 'bounceInOut',
    animationDuration: 1000,
    animationEasing: 'bounceInOut',
    data: Array.from({ length: N_POINT + 1 }, (_, i) => {
      const x = i / N_POINT;
      const y = easingFuncs.bounceInOut(x);
      return [x, y];
    })
  }
];
const titles = [
  {
    top: '5%',
    left: '50%',
    textAlign: 'center',
    text: 'bounceInOut',
    textStyle: {
      fontSize: 12,
      fontWeight: 'normal'
    }
  }
];

const option = {
  // title: titles.concat([
  //   {
  //     top: 'bottom',
  //     left: 'center',
  //     text: 'Different Easing Functions'
  //   }
  // ]),
  grid: grids,
  xAxis: xAxes,
  yAxis: yAxes,
  series: series
};

const ChartCards = () => {
  const isLoading = false;
  return (
    <StyledChartCards>
      {isLoading ? (
        <Skeleton height={180} sx={{ bgcolor: customColors.lightBlue }} />
      ) : (
        <div className="card">
          <div className="card_detail">
            <div className="card_detail_left">
              <div>
                <img src={Icons.incidents} alt="incidents" />
              </div>
              <div>
                <p>Total Incidents</p>
                <h3>25</h3>
              </div>
            </div>
            <div className="card_detail_right">
              <div>
                <img src={Icons.chart} alt="chart" />
              </div>
            </div>
          </div>
          <div className="card_detail_data">
            <p style={{ color: '#27AE60' }}>+40%</p>
            <h6>this month</h6>
          </div>
        </div>
      )}
      {isLoading ? (
        <Skeleton height={180} sx={{ bgcolor: customColors.lightBlue }} />
      ) : (
        <div className="card">
          <div className="card_detail">
            <div className="card_detail_left">
              <div>
                <img src={Icons.recordableRates} alt="recordable-rates" />
              </div>
              <div>
                <p>Recordable Rates</p>
                <h3>3.1 YTD</h3>
              </div>
            </div>
            <div className="card_detail_right">
              <div>
                <img src={Icons.chart} alt="chart" />
              </div>
            </div>
          </div>
          <div className="card_detail_data">
            <p style={{ color: '#F96363' }}>-40%</p>
            <h6>this month</h6>
          </div>
        </div>
      )}
      {isLoading ? (
        <Skeleton height={180} sx={{ bgcolor: customColors.lightBlue }} />
      ) : (
        <div className="card">
          <div className="card_detail">
            <div className="card_detail_left">
              <div>
                <img src={Icons.actionItems} alt="action-items" />
              </div>
              <div>
                <p>Action Items Open</p>
                <h3>15</h3>
              </div>
            </div>
            <div className="card_detail_right">
              <div>
                <img src={Icons.chart} alt="chart" />
              </div>
            </div>
          </div>
          <div className="card_detail_data">
            <p style={{ color: '#27AE60' }}>+40%</p>
            <h6>this month</h6>
          </div>
        </div>
      )}
      {isLoading ? (
        <Skeleton height={180} sx={{ bgcolor: customColors.lightBlue }} />
      ) : (
        <div className="card">
          <div className="card_detail">
            <div className="card_detail_left">
              <div>
                <img src={Icons.safetyObservation} alt="safety-observation" />
              </div>
              <div>
                <p>Safety Observation</p>
                <h3>400</h3>
              </div>
            </div>
            <div className="card_detail_right">
              <div>
                <img src={Icons.chart} alt="chart" />
              </div>
            </div>
          </div>
          <div className="card_detail_data">
            <p style={{ color: '#F96363' }}>-40%</p>
            <h6>this month</h6>
          </div>
        </div>
      )}
    </StyledChartCards>
  );
};

export default ChartCards;
