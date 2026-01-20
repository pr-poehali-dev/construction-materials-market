import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "Изоляция",
      icon: "Square",
      itemCount: 245,
      color: "bg-orange-500",
      image:
        "https://cdn.poehali.dev/projects/957da87a-22f2-4490-82de-9f00287df06f/files/d8a7680c-4a19-4576-8814-a5d3d1df6a08.jpg",
    },
    {
      id: 2,
      name: "Цемент и смеси",
      icon: "Package",
      itemCount: 189,
      color: "bg-blue-500",
      image:
        "https://cdn.poehali.dev/projects/957da87a-22f2-4490-82de-9f00287df06f/files/794a9447-7f06-4c07-8b24-e2184f0deaaf.jpg",
    },
    {
      id: 3,
      name: "Пиломатериалы",
      icon: "TreePine",
      itemCount: 312,
      color: "bg-amber-600",
      image:
        "https://cdn.poehali.dev/projects/957da87a-22f2-4490-82de-9f00287df06f/files/21b33654-e4c4-42ba-a841-52abf6dfe196.jpg",
    },
    {
      id: 4,
      name: "Фильтрация",
      icon: "Drill",
      itemCount: 156,
      color: "bg-slate-600",
      image:
        "https://cdn.poehali.dev/projects/957da87a-22f2-4490-82de-9f00287df06f/files/9fa92227-5795-4f3c-98fe-ec6335c47e8e.jpg",
    },
    {
      id: 5,
      name: "Инструмент",
      icon: "Home",
      itemCount: 278,
      color: "bg-red-600",
      image:
        "https://cdn.poehali.dev/projects/957da87a-22f2-4490-82de-9f00287df06f/files/9e673a8f-ca1e-4395-8a0a-6e5d509363ce.jpg",
    },
    {
      id: 6,
      name: "Канализация",
      icon: "Layers",
      itemCount: 198,
      color: "bg-teal-500",
      image:
        "https://cdn.poehali.dev/projects/957da87a-22f2-4490-82de-9f00287df06f/files/af960d2e-d08c-424b-ab1f-7a39fbde5a3d.jpg",
    },
    {
      id: 7,
      name: "Электроинструмент",
      icon: "Wrench",
      itemCount: 534,
      color: "bg-yellow-500",
      image:
        "https://cdn.poehali.dev/projects/957da87a-22f2-4490-82de-9f00287df06f/files/ad09b6dd-9985-4693-a7d6-09b2b241eae0.jpg",
    },
    {
      id: 8,
      name: "Кровля",
      icon: "Paintbrush",
      itemCount: 421,
      color: "bg-purple-500",
      image:
        "https://cdn.poehali.dev/projects/957da87a-22f2-4490-82de-9f00287df06f/files/9b3417dc-ed3d-407f-815e-66a43c18cb9d.jpg",
    },
    {
      id: 9,
      name: "Пены монтажные",
      icon: "Wrench",
      itemCount: 333,
      color: "bg-yellow-500",
      image:
        "https://cdn.poehali.dev/projects/957da87a-22f2-4490-82de-9f00287df06f/files/9b3417dc-ed3d-407f-815e-66a43c18cb9d.jpg",
    },
    {
      id: 10,
      name: "Пластификаторы",
      icon: "Wrench",
      itemCount: 333,
      color: "bg-yellow-500",
      image:
        "https://cdn.poehali.dev/projects/957da87a-22f2-4490-82de-9f00287df06f/files/9b3417dc-ed3d-407f-815e-66a43c18cb9d.jpg",
    },
    {
      id: 10,
      name: "Силиконы",
      icon: "Wrench",
      itemCount: 333,
      color: "bg-yellow-500",
      image:
        "https://cdn.poehali.dev/projects/957da87a-22f2-4490-82de-9f00287df06f/files/9b3417dc-ed3d-407f-815e-66a43c18cb9d.jpg",
    },
    {
      id: 11,
      name: "Краски",
      icon: "Wrench",
      itemCount: 333,
      color: "bg-yellow-500",
      image:
        "https://cdn.poehali.dev/projects/957da87a-22f2-4490-82de-9f00287df06f/files/9b3417dc-ed3d-407f-815e-66a43c18cb9d.jpg",
    },
    {
      id: 12,
      name: "Краски",
      icon: "Wrench",
      itemCount: 333,
      color: "bg-yellow-500",
      image:
        "https://cdn.poehali.dev/projects/957da87a-22f2-4490-82de-9f00287df06f/files/9b3417dc-ed3d-407f-815e-66a43c18cb9d.jpg",
    }
    {
      id: 13,
      name: "Вентиляция",
      icon: "Wrench",
      itemCount: 333,
      color: "bg-yellow-500",
      image:
        "https://cdn.poehali.dev/projects/957da87a-22f2-4490-82de-9f00287df06f/files/9b3417dc-ed3d-407f-815e-66a43c18cb9d.jpg",
    }
    {
      id: 14,
      name: "Санфаянс",
      icon: "Wrench",
      itemCount: 333,
      color: "bg-yellow-500",
      image:
        "https://cdn.poehali.dev/projects/957da87a-22f2-4490-82de-9f00287df06f/files/9b3417dc-ed3d-407f-815e-66a43c18cb9d.jpg",
     }
     {
       id: 15,
      name: "Профиля,Маяки,уголки",
      icon: "Wrench",
      itemCount: 333,
      color: "bg-yellow-500",
      image:
        "https://cdn.poehali.dev/projects/957da87a-22f2-4490-82de-9f00287df06f/files/9b3417dc-ed3d-407f-815e-66a43c18cb9d.jpg",
     }
      
  ];

  const handleCategoryClick = (categoryName: string) => {
    const catalogSection = document.getElementById("catalog");
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const checkbox = document.getElementById(
          categoryName,
        ) as HTMLInputElement;
        if (checkbox && !checkbox.checked) {
          checkbox.click();
        }
      }, 500);
    }
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Популярные категории
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Выберите категорию и найдите всё необходимое для вашего
            строительства
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card
              key={category.id}
              className="group cursor-pointer overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300 hover:shadow-xl hover-scale"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div
                  className={`absolute top-4 right-4 ${category.color} p-3 rounded-lg text-white`}
                >
                  <Icon name={category.icon as any} size={24} />
                </div>
              </div>

              <div className="p-5 bg-[#ffffff] mx-0 my-[5px] rounded-0">
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {category.itemCount} товаров
                  </span>
                  <Icon
                    name="ArrowRight"
                    size={18}
                    className="text-primary group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;