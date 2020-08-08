import React from "react";
import pet, { Photo } from "@frontendmasters/pet";
import { navigate, RouteComponentProps } from "@reach/router";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
// import ThemeContext from "./ThemeContext";
import Modal from "./Modal";
import { MapStateToProps, connect } from "react-redux";
import { AppState } from "./store/reducers";

// const Modal = lazy(() => import("./Modal"));

interface IStoreProps {
  themeState: string;
}

type PropsType = RouteComponentProps<{ id: string }> & IStoreProps;

interface IState {
  media: Photo[];
  [key: string]: any;
}

class Details extends React.Component<PropsType, IState> {
  constructor(props: Readonly<PropsType>) {
    super(props);
    this.state = {
      loading: true,
      showModal: false,
      media: [],
    };
  }

  public componentDidMount() {
    if (!this.props.id) {
      navigate("/").then();
      return;
    }
    pet
      .animal(+this.props.id)
      .then(({ animal }) => {
        console.log("animal", animal);
        this.setState({
          url: animal.url,
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false,
        });
      })
      .catch((err) => this.setState({ error: err }));
  }
  public toggleModal = () =>
    this.setState({ showModal: !this.state.showModal });
  public adopt = () => navigate(this.state.url as string);
  public render() {
    if (this.state.loading) {
      return <h1>loading … </h1>;
    }

    const {
      animal,
      breed,
      location,
      description,
      media,
      name,
      showModal,
    } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${location}`}</h2>
          <button
            onClick={this.toggleModal}
            style={{ backgroundColor: this.props.themeState }}
          >
            Adopt {name}
          </button>
          {/* <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer> */}
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <h1>Would you like to adopt {name}?</h1>
              <div className="buttons">
                <button onClick={this.adopt}>Yes</button>
                <button onClick={this.toggleModal}>No, I am a monster</button>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps: MapStateToProps<IStoreProps, PropsType, AppState> = ({
  theme,
}: AppState): IStoreProps => ({
  themeState: theme,
});

const DetailsStoreConnected = connect<
  IStoreProps,
  undefined,
  PropsType,
  AppState
>(mapStateToProps)(Details);

export default function DetailsErrorBoundary(props: PropsType) {
  return (
    <ErrorBoundary>
      <DetailsStoreConnected {...props} />
    </ErrorBoundary>
  );
}
