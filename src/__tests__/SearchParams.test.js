import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import pet, { ANIMALS, _breeds, _dogs } from "@frontendmasters/pet";
import SearchParams from "./../SearchParams";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

const store = mockStore({
  location: "Any",
  theme: "red",
});

afterEach(cleanup);

describe("SearchParams ", () => {
  test(" has correct length of animal's dropdown", async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <SearchParams />
      </Provider>
    );

    const animalDropdown = getByTestId("use-dropdown-animal");
    expect(animalDropdown.children.length).toEqual(ANIMALS.length + 1);
  });

  test(" has for breed's API called", async () => {
    render(
      <Provider store={store}>
        <SearchParams />
      </Provider>
    );

    expect(pet.breeds).toHaveBeenCalled();
  });

  test(" has correct length of breed's dropdown", async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <SearchParams />
      </Provider>
    );

    const breedDropdown = getByTestId("use-dropdown-breed");
    expect(breedDropdown.children.length).toEqual(_breeds.length + 1);
  });

  test(" has empty result on initial state", async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <SearchParams />
      </Provider>
    );

    const searchResult = getByTestId("search-result");
    expect(searchResult.textContent).toEqual("No Pets Found");
  });

  test(" has non empty result after submitting the form", async () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <SearchParams />
      </Provider>
    );

    const searchResult = getByTestId("search-result");
    fireEvent(getByText("Submit"), new MouseEvent("click"));
    expect(pet.animals).toHaveBeenCalled();
    expect(searchResult.children.length).toEqual(_dogs.length);
  });

  test(" has a first child matched to an inline snapshot", async () => {
    const { container } = render(
      <Provider store={store}>
        <SearchParams />
      </Provider>
    );
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="search-params"
      >
        <form>
          <label
            for="location"
          >
            Location
            <input
              id="location"
              placeholder="Location"
              value="Any"
            />
          </label>
          <label
            for="use-dropdown-animal"
          >
            Animal
            <select
              data-testid="use-dropdown-animal"
              id="use-dropdown-animal"
            >
              <option />
              <option
                value="dog"
              >
                dog
              </option>
              <option
                value="cat"
              >
                cat
              </option>
              <option
                value="bird"
              >
                bird
              </option>
            </select>
          </label>
          <label
            for="use-dropdown-breed"
          >
            Breed
            <select
              data-testid="use-dropdown-breed"
              id="use-dropdown-breed"
            >
              <option />
              <option
                value="Bichon Frise"
              >
                Bichon Frise
              </option>
              <option
                value="Bolognese"
              >
                Bolognese
              </option>
              <option
                value="Coton de Tulear"
              >
                Coton de Tulear
              </option>
              <option
                value="Havanese"
              >
                Havanese
              </option>
              <option
                value="Maltese"
              >
                Maltese
              </option>
            </select>
          </label>
          <label
            for="theme"
          >
            Theme
            <select
              id="theme"
            >
              <option
                value="peru"
              >
                Peru
              </option>
              <option
                value="darkblue"
              >
                Dark Blue
              </option>
              <option
                value="chartreuse"
              >
                Chartreuse
              </option>
              <option
                value="mediumorchid"
              >
                Medium Orchid
              </option>
            </select>
          </label>
          <button
            style="background-color: red;"
          >
            Submit
          </button>
        </form>
        <div
          class="search"
          data-testid="search-result"
        >
          <h1>
            No Pets Found
          </h1>
        </div>
      </div>
    `);
  });
});
