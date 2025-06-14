import { useEffect } from "react";
import { useApi } from "../../../hooks/useApi";
import UMKMCard from "../../UMKMCard";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Recomendation = ({ id }) => {
  const { result, loading, error, refetch } = useApi(
    "recommendation",
    "GET",
    null,
    id,
    null,
    !!id // aktifkan fetch hanya kalau id ada
  );

  if (loading || !result) {
    return (
      <div className="loading-overlay fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        {/* Bisa pakai lottie animasi sama atau spinner */}
        <DotLottieReact
          src="https://lottie.host/67fd4845-d028-4c65-87fd-e4fae56e6973/qQOdBqThMm.lottie"
          autoplay
          loop
          style={{ width: 400, height: 400 }}
        />
      </div>
    );
  }
  if (error) {
    return (
      <section className="result-predict grid grid-cols-12 bg-error-20 p-4 rounded-lg">
        <div className="card bg-white col-span-6 col-start-4 flex rounded-lg shadow-md">
          <div className="card-body p-6 flex flex-col justify-center items-center">
            <h1 className="text-error-600 font-semibold text-heading-1 mb-2 text-center">
              Terjadi kesalahan saat memproses gambar.
            </h1>
            <p className="text-error-400 text-sm text-center">
              {error.message || "Silakan coba lagi nanti."}
            </p>
            <button
              onClick={refetch}
              className="mt-4 px-4 py-2 bg-error-600 text-white rounded hover:bg-error-700 transition"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </section>
    );
  }

  const data = result.data;

  return (
    <section
      className={`card grid grid-cols-1 md:grid-cols-5 gap-4 bg-primary-20 p-4 rounded-lg md:px-32 text-primary-100`}
    >
      <div
        className={`header ${
          data.length === 2 ? "md:col-span-5" : "md:col-span-3"
        }`}
      >
        <h1 className="text-primary-600 font-semibold mb-2 font-baloo text-heading-1 text-center">
          Beli Dimana ya?
        </h1>
      </div>

      <div
        className={`flex flex-wrap pb-6 md:flex-nowrap ${
          data.length < 3 ? "justify-center md:col-span-5" : "md:col-span-5"
        } gap-4 md:gap-10 max-w-full mx-auto`}
      >
        {data.slice(0, 3).map((item) => (
          <UMKMCard
            key={item.id}
            imgPosition="bottom"
            image_url={item.image_url}
            nama={item.nama}
            alamat={item.alamat}
            no_telp={item.no_telp}
            paling_diminati={item.paling_diminati}
            animateType="fade-up"
            animateOffset="10"
            animateDuration="1000"
          />
        ))}
      </div>
    </section>
  );
};

export default Recomendation;
