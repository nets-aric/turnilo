'use strict';

import { List } from 'immutable';
import * as React from 'react/addons';
import * as d3 from 'd3';
import { $, Dispatcher, Expression, NativeDataset, Datum } from 'plywood';
import { bindOne, bindMany } from "../../utils/render";
import { SplitCombine, Filter, Dimension, Measure, DataSource } from "../../models/index";


interface TimeSeriesVisProps {
  dataSource: DataSource;
  filter: Filter;
  splits: List<SplitCombine>;
  measures: List<Measure>;
  stage: ClientRect;
}

interface TimeSeriesVisState {
  dataset: NativeDataset;
}

export class TimeSeriesVis extends React.Component<TimeSeriesVisProps, TimeSeriesVisState> {

  constructor() {
    super();
    this.state = {
      dataset: null
    };
  }

  fetchData(filter: Filter, measures: List<Measure>) {
    var { dataSource } = this.props;

    var query: any = $('main')
      .filter(filter.toExpression())
      .split($('time').timeBucket('PT1H', 'Etc/UTC'), 'Time');

    measures.forEach((measure) => {
      query = query.apply(measure.name, measure.expression);
    });
    query = query.sort('$Time', 'ascending');

    dataSource.dispatcher(query).then((dataset) => {
      this.setState({ dataset });
    });
  }

  componentDidMount() {
    var { filter, measures } = this.props;
    this.fetchData(filter, measures);
  }

  componentWillReceiveProps(nextProps: TimeSeriesVisProps) {
    var props = this.props;
    if (props.filter !== nextProps.filter || props.measures !== nextProps.measures) {
      this.fetchData(nextProps.filter, nextProps.measures);
    }
  }

  componentWillUnmount() {

  }

  render() {
    var { measures, stage } = this.props;
    var { dataset } = this.state;

    var measureGraphs: Array<React.ReactElement<any>> = null;
    if (dataset) {
      measureGraphs = measures.toArray().map((measure) => {
        return JSX(`
          <div className="measure-graph" key={measure.name}>
            {measure.title}: {stage.width}, {stage.height}
          </div>
        `);
      });
    }

    return JSX(`
      <div className="time-series-vis">
        {measureGraphs}
      </div>
    `);
  }
}
