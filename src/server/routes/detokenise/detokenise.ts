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
import {SettingsGetter } from "../../utils/settings-manager/settings-manager";

export function detokeniseRouter(settingsGetter: SettingsGetter) {

  const router = Router();

  router.post("/", async (req: Request, res: Response) => {
    try {
      const settings = await settingsGetter();
      const detokenised_token = req.body.token + "_detokenised";
      res.json({ data: detokenised_token});
    } catch (error) {
      console.log("error:", error.message);
      if (error.hasOwnProperty("stack")) {
        console.log((<any> error).stack);
      }
      res.status(500).send({
        error: "Could not detokenise token",
        message: error.message
      });
    }
  });

  return router;
}
