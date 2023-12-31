import { Component } from 'react';
import { Api } from '../api';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import { toast } from 'react-toastify';
import style from './ImageGallery.module.css';

export class ImageGallery extends Component {
    state = {
        pictures: [],
        modalPicture: '',
        showModal: false,
        loading: false,
    };

    async componentDidUpdate(prevProps) {
        const { name, page, total } = this.props;

        if (prevProps.name !== name || prevProps.page !== page) {
            this.setState({ loading: true });

            const { data } = await Api(name, page);
            try {
                if (name !== prevProps.name) {
                    this.setState({
                        pictures: data.hits,
                    });
                } else {
                    this.setState(prevState => ({
                        pictures: [...prevState.pictures, ...data.hits],
                    }));
                }
                if (data.totalHits === 0) {
                    toast("We don't find any photo");
                }

                total(data.totalHits / 12);
            } catch (error) {
                console.log(error);
            } finally {
                this.setState({ loading: false });
            }
        }
    }

    toggleModal = image => {
        this.setState({ modalPicture: image });
        this.setState(({ showModal }) => ({
            showModal: !showModal,
        }));
    };

    render() {
        return (
            <section className="section_gallery">
                <ul className={style.ImageGallery}>
                    <ImageGalleryItem
                        pictures={this.state.pictures}
                        onClose={this.toggleModal}
                    />
                </ul>
                {this.state.showModal && (
                    <Modal onClose={this.toggleModal}>
                        <img src={this.state.modalPicture} alt="" />
                    </Modal>
                )}
                {this.state.loading && <Loader />}
            </section>
        );
    }
}