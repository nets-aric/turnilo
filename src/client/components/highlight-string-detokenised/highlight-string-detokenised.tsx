/*
 * Copyright 2015-2016 Imply Data, Inc.
 * Copyright 2017-2019 Allegro.pl
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
import { classNames } from "../../utils/dom/dom";
import ReactDOMServer from 'react-dom/server'
import "./highlight-string-detokenised.scss";

import {DetokenisationValue} from "../../components/detokenisation/detokenisation"

export interface HighlightStringDetokenisedProps {
  className?: string;
  text: string;
  highlight: string | RegExp;
}

export const HighlightStringDetokenised: React.SFC<HighlightStringDetokenisedProps> = ({ className, text, highlight }) => {
  return <span className={classNames("highlight-string-detokenised", className)}><DetokenisationValue token={text} highlight={highlight}></DetokenisationValue></span>;
};
