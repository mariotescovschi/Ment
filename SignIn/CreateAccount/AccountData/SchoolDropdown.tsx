import React, { useRef,} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    TextInput,
} from 'react-native';
import { useCustomDropdownContext } from './DropdownContext';
import Countries from "./Countries";

interface Option {
    id: number;
    name: string;
}

interface CustomDropdownProps {
    options: Option[];
}

const SchoolDropdown = ({ options }: CustomDropdownProps) => {
    const {setCurrentSchool, isOpenSchool, setIsOpenSchool,
        setIsOpenZone, setIsOpenCountry, setIsOpenGrade,
        setIsOpenClass, currentZone, currentCountry,
        searchQuerySchool, setSearchQuerySchool} = useCustomDropdownContext();

    const toggleDropdown = () => {
            setIsOpenSchool(!isOpenSchool);
            setIsOpenCountry(false);
            setIsOpenZone(false);
            setIsOpenClass(false);
            setIsOpenGrade(false);
    };

    // If the user presses backspace, clear the search query and resets the currentSchool
    const handleKeyPress = (e: any) => {
        setIsOpenSchool(true);
        if (e.nativeEvent.key === 'Backspace') {
            setCurrentSchool(Countries[0].zones[0].schools[0]);
        }

    };

    // Takes a string and removes all diacritics so Iasi is the same as Iași
    function removeDiacritics(text: string): string {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    // Filter the options based on the search query
    const filteredOptions = options.filter((option) =>
        removeDiacritics(option.name.toLowerCase()).includes(removeDiacritics(searchQuerySchool.toLowerCase()))
    );

    // Sets currentSchool to the selected option and closes the dropdown
    const handleOptionSelect = (name: string, id: number) => {
        setSearchQuerySchool(name);
        setCurrentSchool(Countries[currentCountry.id].zones[currentZone.id].schools[id]);
        setIsOpenSchool(false);
        if (textInputRef.current) {
            textInputRef.current.blur();
        }
    };

    const textInputRef = useRef<TextInput | null>(null);

    const renderItem = ({item}: {item: Option}) => (
        <TouchableOpacity
            onPress={() => {
                handleOptionSelect(item.name, item.id);
            }}
        >
            <View style={{padding: 5}}>
                <Text style={{ color: 'white', fontSize: 15, textAlign: 'center'}}>{item.name}</Text>

            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1 }}>
            <View style={style.searchBarView}>
                <View style={[style.dropdownSearchBar, {opacity: currentCountry !== Countries[0] && currentZone !== Countries[0].zones[0] ? 1 : 0.2}]}>
                    <TextInput
                        selectTextOnFocus={true}
                        editable={currentCountry !== Countries[0] && currentZone !== Countries[0].zones[0]}
                        ref={textInputRef}
                        placeholder="Scoala"
                        placeholderTextColor={'grey'}
                        onPressIn={toggleDropdown}
                        onChangeText={(text) => setSearchQuerySchool(text)}
                        value={searchQuerySchool}
                        style={{color: 'white', fontSize: 16, flex: 1, textAlign:  'center'}}
                        onKeyPress={handleKeyPress}
                    />
                </View>
            </View>

            <View style={style.dropdownView}>
                {isOpenSchool && (
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

export default SchoolDropdown;

const style = StyleSheet.create({
    searchBarView: {},
    dropdownView: {},
    dropdownList: {
        maxHeight: '100%',
        height: '100%',
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