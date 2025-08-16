import log from './utils/mcqlogger';

log.debug('index.ts: starting importing modules one by one');
import './types/mcq.types';
import './config/mcq.config';
import './components/FeedbackManager';
import './mcq/MCQState';
import './mcq/MCQController';
import './mcqMain';

log.debug('/types/mcq.types loaded\n'
  + '/config/mcq.config loaded\n'
  + '/components/FeedbackManager loaded\n'
  + '/mcq/MCQState loaded\n'
  + '/mcq/MCQController loaded\n'
  + '/mcqlogger.ts loaded\n'
  + '/mcqMain.ts loadedd\n');

log.separator('index.ts: Finish Module importing');