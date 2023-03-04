import { Component } from "react";
import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import { PricesContext } from "../utils/contexts";
import { IPricesContext } from "../utils/interfaces";

const getAxisYDomain = (
  initialData: any[],
  from: number,
  to: number,
  ref: string,
  offset: number
) => {
  const refData: any[] = initialData.slice(from - 1, to);
  let [bottom, top] = [refData[0][ref], refData[0][ref]];

  refData.forEach((d) => {
    if (d[ref] > top) top = d[ref];
    if (d[ref] < bottom) bottom = d[ref];
  });

  return [(bottom | 0) - offset, (top | 0) + offset];
};

const initialState = (initialData: any[]) => ({
  data: initialData,
  left: "dataMin",
  right: "dataMax",
  refAreaLeft: "",
  refAreaRight: "",
  top: "dataMax+1",
  bottom: "dataMin-1",
  top2: "dataMax+20",
  bottom2: "dataMin-20",
  animation: true
});

export default class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = initialState(props.initialData);
  }

  static contextType = PricesContext;
  context!: IPricesContext;

  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
    if (prevProps.initialData !== this.props.initialData) {
      this.setState(initialState(this.props.initialData));
    }
  }

  zoom() {
    let { refAreaLeft, refAreaRight } = this.state;
    const { data } = this.state;

    if (refAreaLeft === refAreaRight || refAreaRight === "") {
      this.setState(() => ({
        refAreaLeft: "",
        refAreaRight: ""
      }));
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight)
      [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    // yAxis domain
    const [bottom, top] = getAxisYDomain(
      data,
      refAreaLeft,
      refAreaRight,
      "price",
      1);
    const [bottom2, top2] = getAxisYDomain(
      data,
      refAreaLeft,
      refAreaRight,
      "impression",
      50
    );

    this.setState(() => ({
      refAreaLeft: "",
      refAreaRight: "",
      data: data.slice(),
      left: refAreaLeft,
      right: refAreaRight,
      bottom,
      top,
      bottom2,
      top2
    }));
    this.context.setPrices(
      {
        firstPriceData: data[refAreaLeft],
        lastPriceData: data[refAreaRight]
      }
    );
  }

  zoomOut() {
    const { data } = this.state;
    this.setState(() => ({
      data: data.slice(),
      refAreaLeft: "",
      refAreaRight: "",
      left: "dataMin",
      right: "dataMax",
      top: "dataMax+1",
      bottom: "dataMin",
      top2: "dataMax+50",
      bottom2: "dataMin+50"
    }));
    this.context.setPrices(
      {
        firstPriceData: data[0],
        lastPriceData: data[data.length - 1]
      }
    )
  }

  render() {
    const {
      data,
      left,
      right,
      refAreaLeft,
      refAreaRight,
      top,
      bottom,
      top2,
      bottom2
    } = this.state;


    return (
      <Container>
        
        <ResponsiveContainer width={"100%"} height={300}>
        <LineChart
          data={data}
          onMouseDown={(e: any) =>
            this.setState({ refAreaLeft: e.activeLabel })
          }
          onMouseMove={(e: any) =>
            this.state.refAreaLeft &&
            this.setState({ refAreaRight: e.activeLabel })
          }
          // eslint-disable-next-line react/jsx-no-bind
          onMouseUp={this.zoom.bind(this)}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#525252" />
          <XAxis
            allowDataOverflow
            dataKey="index"
            domain={[left, right]}
            type="number"
            tickFormatter={(value: any, index: number) => formatXAxis(value, data)}
            stroke="#c2c2c2"
          />
          <YAxis
            allowDataOverflow
            domain={[bottom, top]}
            type="number"
            yAxisId="1"
            tickFormatter={formatYAxis}
            stroke="#c2c2c2"
          />
          <YAxis
            orientation="right"
            allowDataOverflow
            domain={[bottom2, top2]}
            type="number"
            yAxisId="2"
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            yAxisId="1"
            type="natural"
            dataKey="price"
            stroke="#818cf8"
            animationDuration={300}
            dot={false}
          />

          {refAreaLeft && refAreaRight ? (
            <ReferenceArea
              yAxisId="1"
              x1={refAreaLeft}
              x2={refAreaRight}
              strokeOpacity={0.3}
            />
          ) : null}
        </LineChart>
        </ResponsiveContainer>
        <Button
          onClick={this.zoomOut.bind(this)}
        >
          Zoom Out
        </Button>
      </Container>
    );
  }
}

function formatYAxis(value: number, index: number): string {
  // when surpass 1000 use K for thousands
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}K`;
  }
  return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
}

function formatXAxis(value: any, data: any): string {
  try{
    return data[value].year;
  }
  catch (e) {
    return '';
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
  width: 100%;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px;
  border-radius: 15px;
  background: transparent;
  border: 1px solid #455EB5;
  color: #e3ded7;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%);
    box-shadow: rgba(80, 63, 205, 0.5) 0 1px 10px;
  }
`;




