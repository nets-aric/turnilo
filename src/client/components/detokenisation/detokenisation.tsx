/*
 * Copyright 2017-2018 Allegro.pl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";
import { STRINGS } from "../../config/constants";

interface TokenProp {
    token: string;
    highlight?: string | RegExp
}

interface  DetokenisationValueState{
  data: string;
  error?: string;
}

export class DetokenisationValue extends React.Component<TokenProp, DetokenisationValueState> {

  state: DetokenisationValueState = { data: null };

  componentDidMount() {
    if (/^t:[0-9a-fA-F]{24}$/.test(this.props.token)){
      this.detokenise()
      .then(({ data, error }) => {
        if (error){
          this.setState({ error: STRINGS.detokenisationFailed });
        } else {
          this.setState({ data: data });
        }
      })
      .catch(() => {
        this.setState({ error: STRINGS.detokenisationFailed });
      });
    }
    else {
      this.setState({ data: this.props.token });
    }
  }

  detokenise() {
    return fetch("detokenise",{
      method: 'post', 
      body: JSON.stringify({"token": this.props.token}),
      headers: {"Content-Type": "application/json"}
    })
    .then(response => {
      return response.json();
    })
  }

  highlightByIndex(text: string, start: number, end: number) {
    return [
      <span className="pre" key="pre">{text.substring(0, start)}</span>,
      <span className="bold" key="bold">{text.substring(start, end)}</span>,
      <span className="post" key="post">{text.substring(end)}</span>
    ];
  }
  
  highlightBy(text: string, highlight: string | RegExp): string | JSX.Element[] {
    
    if (!highlight) return text;
  
    if (typeof highlight === "string") {
      const strLower = text.toLowerCase();
      const startIndex = strLower.indexOf(highlight.toLowerCase());
      if (startIndex === -1) return text;
      return this.highlightByIndex(text, startIndex, startIndex + highlight.length);
    }
    const match = text.match(highlight);
    if (!match) return text;
    const startIndex = match.index;
    return this.highlightByIndex(text, startIndex, startIndex + match[0].length);
  }

  renderDetokenisedValue() {
    const { data, error } = this.state;
    if (error) return error;
    if (!data) return STRINGS.detokenisation;
    if (!data && this.props.highlight) return this.highlightBy(STRINGS.detokenisation, this.props.highlight)
    return data;
  }

  render() {
    return this.renderDetokenisedValue();
  }
}