import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TextInput, Pressable,
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

const ZoneDropdown = ({ options }: CustomDropdownProps) => {
    const {setSearchQuerySchool, isOpenZone, setIsOpenZone ,
        setIsOpenCountry, setIsOpenSchool, setIsOpenGrade,
        setIsOpenClass, setCurrentSchool, setCurrentZone,
        currentCountry, searchQueryZone, setSearchQueryZone} = useCustomDropdownContext();

    const toggleDropdown = () => {
        if(currentCountry.id !== 0) {
            setIsOpenZone(!isOpenZone);

            setIsOpenCountry(false);
            setIsOpenSchool(false);
            setIsOpenClass(false);
            setIsOpenGrade(false);
        }
    };

    // If the user presses backspace, clear the search query and resets the currentZone and currentSchool
    const handleKeyPress = (e: any) => {
        setIsOpenZone(true);
        if (e.nativeEvent.key === 'Backspace') {
            setSearchQuerySchool('');
            setCurrentZone(Countries[0].zones[0]);
            setCurrentSchool(Countries[0].zones[0].schools[0])
        }
    };

    // Takes a string and removes all diacritics so Iasi is the same as Iași
    function removeDiacritics(text: string): string {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    // Filter the options based on the search query
    const filteredOptions = options.filter((option) =>
        removeDiacritics(option.name.toLowerCase()).includes(removeDiacritics(searchQueryZone.toLowerCase()))
    );

    // Sets currentZone to the selected option and closes the dropdown
    const handleOptionSelect = (name: string, id: number) => {
        setSearchQueryZone(name);
        setCurrentZone(Countries[currentCountry.id].zones[id]);
        setIsOpenZone(false);
        if (textInputRef.current) {
            textInputRef.current.blur();
        }
    };

    const textInputRef = useRef<TextInput | null>(null);

    const renderItem = ({ item }: { item: Option }) => (
        <Pressable
            onPress={() => {
                handleOptionSelect(item.name, item.id);
            }}
        >
            <View>
                <Text style={{ color: 'white', fontSize: 20}}>{item.name}</Text>
            </View>
        </Pressable>
    );

    return (
        <View style={{ flex: 1 }}>
            <View style={style.searchBarView}>
                <View style={[style.dropdownSearchBar, {opacity: currentCountry.id !== 0 ? 1 : 0.2}]}>
                    <TextInput
                        selectTextOnFocus={true}
                        editable={currentCountry.id !== 0}
                        ref={textInputRef}
                        placeholder="Judetul"
                        placeholderTextColor={'grey'}
                        onPressIn={toggleDropdown}
                        onChangeText={(text) => setSearchQueryZone(text)}
                        value={searchQueryZone}
                        style={{color: 'white', fontSize: 20, flex: 1, marginLeft: 10}}
                        onKeyPress={handleKeyPress}
                    />
                </View>
            </View>

            <View style={style.dropdownView}>
                {isOpenZone && (
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

export default ZoneDropdown;

const style = StyleSheet.create({
    searchBarView: {},
    dropdownView: {},
    dropdownList: {
        maxHeight: 80,
        margin: 10,
        marginLeft: 16,
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