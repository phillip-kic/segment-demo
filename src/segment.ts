import {createClient} from '@segment/analytics-react-native';
import {Persistor} from '@segment/sovran-react-native';
import {MMKVLoader} from 'react-native-mmkv-storage';

const segmentKey = '';

const storage = new MMKVLoader()
  .withInstanceID('segment-persistor')
  .initialize();

const mmkvGet = async <T>(key: string) =>
  (await storage.getMapAsync<{state: T}>(key))?.state;

const mmkvSet = async <T>(key: string, state: T) => {
  await storage.setMapAsync(key, {state});
};

const mmkvPersistor: Persistor = {
  get: mmkvGet,
  set: mmkvSet,
};

export const segmentClient = createClient({
  writeKey: segmentKey,
  trackAppLifecycleEvents: true,
  storePersistor: mmkvPersistor,
});
