import React, {
  useState,
  useEffect,
  // useContext,
  FunctionComponent,
} from "react";
import { RouteComponentProps } from "@reach/router";
// @ts-ignore
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import pet, { ANIMALS, Animal, AnimalsParams } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import Results from "./Results";
import { AppState } from "./store/reducers";
import changeTheme from "./store/actions/changeTheme";
import changeLoacation from "./store/actions/changeLocation";
import { Dispatch, AnyAction } from "redux";
// import ThemeContext from "./ThemeContext";

interface IStoreProps {
  themeState: string;
  locationState: string;
}

interface IDispatchProps {
  setTheme: (theme: string) => AnyAction;
  updateLocation: (theme: string) => AnyAction;
}

type PropsType = RouteComponentProps & IStoreProps & IDispatchProps;

const SearchParams: FunctionComponent<PropsType> = (props) => {
  // const [theme, setTheme] = useContext(ThemeContext);
  // const [location, updateLocation] = useState("Seattle, WA");
  const [breeds, updateBreeds] = useState<string[]>([]);
  const [pets, setPets] = useState<Animal[]>([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, updateBreed] = useDropdown("Breed", "", breeds);

  function requestPets() {
    const params: AnimalsParams = {
      location: props.locationState,
      breed,
      type: animal,
    };
    console.log("requestPets - params", params);
    pet.animals(params).then(({ animals }) => {
      console.log("animals", animals);
      setPets(animals || []);
    });
  }

  useEffect(() => {
    updateBreeds([]);
    updateBreed("");

    pet.breeds(animal).then(({ breeds: allBreeds }) => {
      console.log("breeds", allBreeds);
      const breedStrings = allBreeds.map(({ name }) => name);
      updateBreeds(breedStrings);
    }, console.error);
  }, [animal]);

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            defaultValue={props.locationState}
            placeholder="Location"
            onBlur={(e) =>
              props.updateLocation ? props.updateLocation(e.target.value) : null
            }
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          Theme
          <select
            id="theme"
            value={props.themeState}
            onChange={(e) =>
              props.setTheme ? props.setTheme(e.target.value) : null
            }
            onBlur={(e) =>
              props.setTheme ? props.setTheme(e.target.value) : null
            }
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>
        <button style={{ backgroundColor: props.themeState }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

const mapStateToProps: MapStateToProps<IStoreProps, PropsType, AppState> = ({
  theme,
  location,
}: AppState): IStoreProps => ({
  themeState: theme,
  locationState: location,
});

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IStoreProps> = (
  dispatch: Dispatch<AnyAction>
) => ({
  setTheme: (theme: string) => dispatch(changeTheme(theme)),
  updateLocation: (location: string) => dispatch(changeLoacation(location)),
});

export default connect<IStoreProps, IDispatchProps, PropsType, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(SearchParams);
