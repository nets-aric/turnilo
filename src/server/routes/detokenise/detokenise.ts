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

import { Request, Response, Router } from "express";
import * as request from "request-promise-native";
import {SettingsGetter } from "../../utils/settings-manager/settings-manager";

export function detokeniseRouter(settingsGetter: SettingsGetter) {

  const router = Router();

  router.post("/", async (req: Request, res: Response) => {
    try {
      console.log('test1')
      const settings = await settingsGetter();
      console.log('test2')
      const detokeniser = settings.customization.detokeniser;
      console.log('test3')
      const detokenised_token = await detokeniser.detokeniserFunction('"' + req.body.token + '"', request);
      console.log('test4')
      res.json({ data: detokenised_token});
    } catch (error) {
      console.log('test5')
      if (error.hasOwnProperty("stack")) {
        console.log((<any> error).stack);
      }
      console.log('test6')
      res.status(500).send({
        error: "Could not detokenise token",
        message: error.message
      });
      console.log('test7')
    }
  });

  return router;
}
