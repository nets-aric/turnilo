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
}

interface  DetokenisationValueState{
  data: string;
  error?: string;
}

export class DetokenisationValue extends React.Component<TokenProp, DetokenisationValueState> {

  state: DetokenisationValueState = { data: null };

  componentDidMount() {
    if (/^t:[0-9a-fA-F]{24}$/.test(this.props.token)){
      console.log("test11")
      this.detokenise()
      .then(({ data }) => {
        console.log("test22")
        this.setState({ data });
      })
      .catch(() => {
        this.setState({ error: "Couldn't detokenise the token provided" });
      });
    }
    else {
      this.setState({ data: this.props.token });
    }
  }

  detokenise() {
    console.log("test33")
    return fetch("detokenise",{
      method: 'post', 
      body: JSON.stringify({"token": this.props.token}),
      headers: {"Content-Type": "application/json"}
    })
    .then(response=>{
      return response.json();
    })
  }

  renderDetokenisedValue(){
    console.log("test44")
    const { data, error } = this.state;
    if (error) return error;
    if (!data) return STRINGS.detokenisation;
    return <div>{data}</div>;
  }

  render() {
    return <React.Fragment>{this.renderDetokenisedValue()}</React.Fragment>;
  }
}