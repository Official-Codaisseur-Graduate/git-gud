import Chart from "react-apexcharts";
import * as React from "react";

export default class ChartContainer extends React.Component {
  getProfileScore = array => {
    const scores = array.map(el => el.profileScore);
    return [...scores, this.props.currentProfileScore];
  };

  getGitScore = array => {
    const scores = array.map(el => el.gitScore);
    return [...scores, this.props.currentGitScore];
  };

  getDates = array => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const dates = array.map(el =>
      new Date(parseInt(el.createdAt)).toLocaleDateString("en-GB", options)
    );
    return [...dates, new Date().toLocaleDateString("en-GB", options)];
  };

  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          height: 350,
          type: "bar",
          stacked: true,
          zoom: {
            enabled: true
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0
              }
            }
          }
        ],
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        xaxis: {
          categories: this.getDates(this.props.previousScores)
        },
        legend: {
          position: "right",
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      },
      series: [
        {
          name: "Profile score",
          data: this.getProfileScore(this.props.previousScores)
        },
        {
          name: "GitUse score",
          data: this.getGitScore(this.props.previousScores)
        }
      ]
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="500"
            />
          </div>
        </div>
      </div>
    );
  }
}