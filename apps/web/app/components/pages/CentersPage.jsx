import Footer from "../layout/Footer";
import CenterCard from "../cards/CenterCard";

export default function CentersPage({ setPage, centers, t }) {
  return (
    <>
      <div style={{ paddingTop: 100 }}>
        <section className="section">
          <div className="section-header">
            <div className="section-tag">{t("centers.tag")}</div>
            <h2 className="section-title">{t("centers.title")}</h2>
            <p className="section-sub">{t("centers.subtitle")}</p>
          </div>
          <div className="centers-grid">
            {centers.map((c) => <CenterCard key={c.id} center={c} setPage={setPage} t={t} />)}
          </div>
        </section>
      </div>
      <Footer setPage={setPage} t={t} />
    </>
  );
}
