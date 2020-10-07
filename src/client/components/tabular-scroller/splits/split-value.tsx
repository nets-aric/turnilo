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
import { classNames } from "../../../utils/dom/dom";
import "./split-value.scss";
import { STRINGS } from "../../../../config/constants";
import {DetokenisationValue} from "../../../../components/detokenisation/detokenisation"

interface SplitValueProps {
  highlight: boolean;
  dimmed: boolean;
  className?: string;
  style: React.CSSProperties;
}

export const SplitValue: React.SFC<SplitValueProps> = ({ className, highlight, dimmed, children, style }) => {
  return <div
    className={classNames("split-value", className, { dimmed, highlight })}
    style={style}><DetokenisationValue token={children.toString()}/>
  </div>;
}  
