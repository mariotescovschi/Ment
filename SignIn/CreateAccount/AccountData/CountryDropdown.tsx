import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    StyleSheet,
    TextInput,
} from 'react-native';
import icons from './Countries';
import { useCustomDropdownContext } from './DropdownContext';
import Countries from "./Countries";

interface Option {
    id: number;
    name: string;
}

interface CustomDropdownProps {
    options: Option[];
}

const CountryDropdown = ({ options }: CustomDropdownProps) => {
    const {setSearchQuerySchool, setCurrentSchool, setSearchQueryZone,
        setCurrentCountry, setCurrentZone, isOpenCountry,
        setIsOpenCountry, setIsOpenZone, setIsOpenSchool,
        setIsOpenGrade, setIsOpenClass} = useCustomDropdownContext();
    const [currentIcon, setCurrentIcon] = useState(-1);
    const [searchQuery, setSearchQuery] = useState('');
    const toggleDropdown = () => {
        setIsOpenCountry(!isOpenCountry);


        setIsOpenZone(false);
        setIsOpenSchool(false);
        setIsOpenClass(false);
        setIsOpenGrade(false);
    };

    // If the user presses backspace, the search query is cleared and resets currentCountry, currentZone, currentSchool
    const handleKeyPress = (e: any) => {
        setIsOpenCountry(true);
        if (e.nativeEvent.key === 'Backspace') {
            setSearchQueryZone('');
            setSearchQuerySchool('');
            setCurrentCountry(Countries[0]);
            setCurrentZone(Countries[0].zones[0]);
            setCurrentSchool(Countries[0].zones[0].schools[0])
            setCurrentIcon(-1);
        }
    };

    // Filter the options based on the search query
    const filteredOptions = options.filter((option) =>
        option.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // When an option is selected, currentZone and currentSchool reset and the dropdown is closed
    const handleOptionSelect = (id: number, name: string) => {
        setCurrentIcon(id);
        setCurrentCountry(Countries[id]);
        setCurrentZone(Countries[0].zones[0]);
        setSearchQueryZone('');
        setSearchQuery(name);
        setIsOpenCountry(false);
        if (textInputRef.current) {
            textInputRef.current.blur();
        }
    };

    const textInputRef = useRef<TextInput | null>(null);

    const renderItem = ({ item }: { item: Option }) => (
        <View style={{height: item.id === 0 ? '0%' : null}}>
        <TouchableOpacity
            onPress={() => {
                handleOptionSelect(item.id, item.name);
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <Image
                    style={{ width: 30, height: 30, marginLeft: 2, marginRight: 10 }}
                    source={icons[item.id].image}
                />
                <Text style={{ color: 'white', fontSize: 20, alignSelf: 'center'}}>{item.name}</Text>
            </View>
        </TouchableOpacity>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <View style={style.searchBarView}>
                <View style={style.dropdownSearchBar}>
                    <Image
                        style={{
                            width: 30,
                            height: 30,
                            marginHorizontal: 10,
                        }}
                        source={
                            currentIcon !== -1 ? icons[currentIcon].image : require('../../../assets/AccountSettings/FlagCountries/icon-none.png')
                        }
                    />
                    <TextInput
                        selectTextOnFocus={true}
                        ref={textInputRef}
                        placeholder="Tara"
                        placeholderTextColor={'grey'}
                        onPressIn={toggleDropdown}
                        onChangeText={(text) => {
                            setSearchQuery(text)
                        }}
                        value={searchQuery}
                        style={{ color: 'white', fontSize: 20, flex: 1,}}
                        onKeyPress={handleKeyPress}
                    />
                </View>
            </View>

            <View style={style.dropdownView}>
                {isOpenCountry && (
                    <FlatList
                        keyboardShouldPersistTaps="handled"
                        style={style.dropdownList}
                        data={filteredOptions}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                )}
            </View>
        </View>
    );
};

export default CountryDropdown;

const style = StyleSheet.create({
    searchBarView: {},
    dropdownView: {},
    dropdownList: {
        maxHeight: '100%',
        margin: 10,
        marginLeft: 13,
    },
    dropdownSearchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        height: 50,
        borderColor: 'white',
        borderRadius: 10,
        marginHorizontal: 5,
    },
});