import ActionButton from '@app/components/button/ActionButton'
import Header from '@app/components/header/Header'
import NavigationService from '@app/navigation/helpers/NavigationService'
import { RootStackParamList } from '@app/navigation/helpers/types/RootStackNavigationTypes'
import Colors from '@app/styles/Colors'
import Styles from '@app/styles/Styles'
import { VehicleModel } from '@data/model/VehicleModel'
import { AppDispatch } from '@data/redux/ReduxStore'
import useShallowEqualAppSelector from '@hooks/useShallowEqualAppSelector'
import CheckBox from '@react-native-community/checkbox'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { isEmpty, isNil } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { clearAppliedFilters, FilterVehicles, resetFilteredVehicles, setAppliedFilters, setFilteredVehicles } from '../dashboard/VehiclesSlice'

type DropdownModel = {
  label: string
  value: string 
}

type Props = NativeStackScreenProps<RootStackParamList, 'Filter'> & {}

const FilterScreen = ({}: Props) => {
  const [t] = useTranslation()
  const dispatch = useDispatch<AppDispatch>()

  const [openMake, setOpenMake] = useState(false)
  const [selectedValueMake, setSelectedValueMake] = useState<string[] | null>(null)
  const [itemsMake, setItemsMake] = useState<DropdownModel[]>([])
  const [openModel, setOpenModel] = useState(false)
  const [selectedValueModel, setSelectedValueModel] = useState<string[] | null>(null)
  const [itemsModel, setItemsModel] = useState<DropdownModel[]>([])
  const [minBid, setMinBid] = useState<string>()
  const [maxBid, setMaxBid] = useState<string>()

  const vehicleList = useShallowEqualAppSelector((state) => state.vehicles.vehicleList)
  const appliedFilters = useShallowEqualAppSelector((state) => state.vehicles.appliedFilters)


  const getUniqueMake = (vehicleList: VehicleModel[]): { label: string; value: string }[] => {
    const uniqueMakes = new Set<string>()
  
    vehicleList.forEach(vehicle => {
      uniqueMakes.add(vehicle.make)
    })
  
    return Array.from(uniqueMakes).map(make => ({
      label: make,
      value: make
    }))
  }

  const getModelsByMake = (selectedMake: string): { label: string; value: string }[] => {
    const models = vehicleList
      .filter(vehicle => vehicle.make === selectedMake)
      .map(vehicle => vehicle.model)
    const uniqueModels = Array.from(new Set(models))
    return uniqueModels.map(model => ({ label: model, value: model }))
  }
  
  const onApplyPress = () => {
    const filter: FilterVehicles  = {
      make: selectedValueMake,
      model: selectedValueModel,
      minBid: minBid ? parseFloat(minBid) : undefined,
      maxBid: maxBid ? parseFloat(maxBid) : undefined,
    }

    dispatch(setFilteredVehicles(filter))
    dispatch(setAppliedFilters(filter))
    NavigationService.goBack()
  }

  const onClearFiltersPress = () => {
    setSelectedValueMake(null)
    setSelectedValueModel(null)
    setMinBid(undefined)
    setMaxBid(undefined)

    dispatch(clearAppliedFilters())
    dispatch(resetFilteredVehicles())
    
    setItemsModel([])
  }

  useEffect(() => {
    setSelectedValueMake(appliedFilters.make)
    setSelectedValueModel(appliedFilters.model)
    setMinBid(appliedFilters.minBid ? appliedFilters.minBid.toString() : undefined)
    setMaxBid(appliedFilters.maxBid ? appliedFilters.maxBid.toString() : undefined)
    setItemsMake(getUniqueMake(vehicleList))
  }, [])

  useEffect(() => {
    if (selectedValueMake && selectedValueMake.length === 1) {
      setItemsModel(getModelsByMake(selectedValueMake[0]))
    } else {
      setItemsModel([])
      setSelectedValueModel(null)
    }
  }, [selectedValueMake])


  const isDropdownDisable = isNil(selectedValueMake) || isEmpty(selectedValueMake) || selectedValueMake.length > 1

  return (
    <SafeAreaView edges={['top']} style={styles.mainContainer}>
      <Header
        title={'Filter'}
        hasBackButton
      />
      <View style={styles.detailsContainer}>
        <View style={{zIndex:2}}>
          <DropDownPicker
            style={[styles.dropdown, styles.marginSeparator]}
            open={openMake}
            value={selectedValueMake}
            items={itemsMake}
            setOpen={setOpenMake}
            setValue={setSelectedValueMake}
            setItems={setItemsMake}
            multiple={true}
            min={0} 
            placeholder={'Make'}
            placeholderStyle={{color:Colors.primary}}
            dropDownContainerStyle={styles.marginSeparator}
          />
          <View style={{flexDirection:'row'}}>
            {selectedValueMake && selectedValueMake.map((make, index) => <Text key={`make_`+index}>{make}{', '}</Text>)}
          </View>

        </View>
        <View style={{zIndex:1}}>
          <DropDownPicker
            style={[styles.dropdown, styles.marginSeparator]}
            open={openModel}
            value={selectedValueModel}
            items={itemsModel}
            setOpen={setOpenModel}
            setValue={setSelectedValueModel}
            setItems={setItemsModel}
            disabled={isDropdownDisable}
            disabledStyle={{backgroundColor:Colors.inactive}}
            multiple={true}
            min={0} 
            placeholder={'Model'}
            placeholderStyle={{color:Colors.primary}}
            dropDownContainerStyle={styles.marginSeparator}
          />
            {isDropdownDisable ? <Text style={{...Styles.text.smallText}}>{t('screens.filter.one_make')}</Text> : 
            <View style={{flexDirection:'row'}}>
              {selectedValueModel && selectedValueModel.map((model, index) => <Text key={`model`+index}>{model}{', '}</Text>)}
            </View>
            }
        </View>
        <Text style={[styles.bidLabel,styles.marginSeparator]}>{t('screens.filter.bid')}</Text>
        <View style={styles.bidContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.bidInput}
              onChangeText={(text) => {
                const numericText = text.replace(/[^0-9]/g, '')
                setMinBid(numericText) 
              }}
              value={minBid}
              placeholder="Min"
              keyboardType="numeric"
              placeholderTextColor={Colors.primary}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.bidInput}
              onChangeText={(text) => {
                const numericText = text.replace(/[^0-9]/g, '')
                setMaxBid(numericText) 
              }}
              value={maxBid}
              placeholder="Max"
              keyboardType="numeric"
              placeholderTextColor={Colors.primary}
            />
          </View>
        </View>  
        <ActionButton label='Apply' onPress={onApplyPress} style={[styles.button, styles.marginSeparator]}/> 
        <TouchableOpacity style={[styles.clearContainer, styles.marginSeparator]} onPress={onClearFiltersPress}>
          <Text style={styles.clearLabel}>{t('screens.filter.clear_filter')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: 10,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
    paddingTop:20
  },
  bidLabel:{
    ...Styles.text.optionTitle,
  },
  bidContainer:{
    marginTop:10,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  textInputContainer:{
    backgroundColor: Colors.primary_30Pct,
    height: 50,
    width:'45%',
    borderRadius: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  bidInput:{
    ...Styles.text.values
  },
  dropdown: {
    backgroundColor: Colors.primary_30Pct, 
    borderColor:'transparent'
  },
  button:{
    alignSelf:'center', 
  },
  marginSeparator:{
    marginTop: 40
  },
  clearContainer:{
    alignSelf: 'center'
  },
  clearLabel:{
    ...Styles.text.values,
  }
})

export default FilterScreen
