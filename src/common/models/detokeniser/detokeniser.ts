/*
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

import { Instance } from "immutable-class";
import { Binary, Unary } from "../../utils/functional/functional";

export type DetokeniserFn = Binary<string,any, Promise<string>>;
export type DetokeniserDef = string;

export class Detokeniser implements Instance<DetokeniserDef, DetokeniserDef> {

  static fromJS(definition: DetokeniserDef): Detokeniser {
    return new Detokeniser(definition);
  }

  public readonly detokeniserFunction: DetokeniserFn;

  constructor(private detokeniserDefinition: string) {
    this.detokeniserFunction = new Function("token", "request", detokeniserDefinition) as DetokeniserFn;
  }

  public toJS(): DetokeniserDef {
    return this.detokeniserDefinition;
  }

  public valueOf(): DetokeniserDef {
    return this.detokeniserDefinition;
  }

  public toJSON(): DetokeniserDef {
    return this.toJS();
  }

  public equals(other: Detokeniser): boolean {
    return other instanceof Detokeniser && this.valueOf() === other.valueOf();
  }

  public toString(): string {
    return this.detokeniserDefinition;
  }
}
