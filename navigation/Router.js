import { createRouter } from '@expo/ex-navigation';

import ContentsScreen from "../screens/ContentsScreen";
import CaseScreen from "../screens/CaseScreen";


export default createRouter(() => ({
	contents: () => ContentsScreen,
	case: () => CaseScreen,
  // rootNavigation: () => RootNavigation,
}));
