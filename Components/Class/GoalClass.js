import {_retrieveData, _storeData} from '../helpers/Functions';
import praying from './GoalsAssetsFunctions/praying';
import moment from 'moment';
const listGaolsTypes = {
  praying: praying,
};
export default class Goal {
  type = null;
  id = null;
  goal = null;
  today = moment().format('DD-MM-YYYY');
  time = moment().format('h-m');
  report = d => {
    var g = listGaolsTypes[this.type].makeReport(d);
    return g;
  };
  setType = type => {
    this.type = type;
    return this;
  };
  setId = id => {
    this.id = id;
    return this;
  };

  getGoalSuccessValue = d => {
    var g = listGaolsTypes[this.type].getSuccessValue(d);
    return g;
  };

  getInfoReqForReport = d => {
    var g = listGaolsTypes[this.type].getInfoReqForReport();
    return g;
  };

  get = async () => {
    var Gaols = await _retrieveData('Goals');
    Gaols = JSON.parse(Gaols);
    var OwnGoal = null;
    for (var i in Gaols) {
      if (Gaols[i].id === this.id) {
        OwnGoal = Gaols[i];
        break;
      }
    }
    this.goal = OwnGoal;
    return OwnGoal;
  };

  Success = async ({details, Goaldata}) => {
    var _data = {
      date: this.today,
      time: this.time,
      details: details,
      data: Goaldata,
      type: 'SUCCESS',
    };

    this.goal.SuccessProgress.push(_data);

    var GJson = await _retrieveData('Goals');

    if (!GJson) {
      GJson = '[]';
    }

    GJson = JSON.parse(GJson);

    for (var i in GJson) {
      if (GJson[i].id === this.id) {
        GJson[i] = this.goal; // replace old values
      }
    }

    GJson = JSON.stringify(GJson);

    await _storeData('Goals', GJson);
  };

  Failed = async ({details, Goaldata}) => {
    var _data = {
      date: this.today,
      time: this.time,
      type: 'FAILED',
      details: details,
      data: Goaldata,
    };

    this.goal.FailedProgress.push(_data);

    var GJson = await _retrieveData('Goals');

    if (!GJson) GJson = '[]';

    GJson = JSON.parse(GJson);

    for (var i in GJson) {
      if (GJson[i].id == this.id) {
        GJson[i] = this.goal; // replace old values
      }
    }

    GJson = JSON.stringify(GJson);

    await _storeData('Goals', GJson);
  };

  _archiving = async () => {
    var Gaols = await _retrieveData('Goals');
    var Goals_archived = await _retrieveData('Goals_archived');

    if (!Goals_archived) Goals_archived = '[]';

    Gaols = JSON.parse(Gaols);
    Goals_archived = JSON.parse(Goals_archived);
    for (var i in Gaols) {
      if (Gaols[i].id == this.id) {
        Goals_archived.push(Gaols[i]);
        Gaols.splice(i, 1);
        break;
      }
    }

    Gaols = JSON.stringify(Gaols);
    Goals_archived = JSON.stringify(Goals_archived);

    await _storeData('Goals', Gaols);
    await _storeData('Goals_archived', Goals_archived);
  };
}
